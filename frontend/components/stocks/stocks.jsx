import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  YAxis,
} from "recharts";

import { Tab, Tabs, TabList, TabPanel} from 'react-tabs';

import { externalApi, portfolioApi, watchlistApi } from '../../utils/firebaseApi';

import { TickerSymbols } from "../../../public/tickers";

// Import the image asset
const roberthoodHatURL = '/assets/roberthood_hat.png';

export default ({currentUser, logout}) => {

   const { ticker } = useParams(); 

   const [searchValue, setSearchValue] = useState(ticker);
   const [quote, setQuote] = useState({});
   const [chartData, setChartData] = useState([]);
   const [news, setNews] = useState([]);
   const [show, setShow] = useState(false);
   const [portfolioValue, setPortfolioValue] = useState([]);
   const [stock, setStock] = useState([]);
   const [shares, setShares] = useState(0);
   const [availableShares, setAvailableShares] = useState(0);
   const [sharesError, setSharesError] = useState(null);
   const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();
  const routeChange = () => {
     let path = `/account`;
     history.push(path);
   }; 
  
  const routeChangeStocksPage = (ticker) => {
    let path = ticker;
    history.push(path);
  };

  useEffect(() => {
    if (quote && quote.latest_price) {
      document.title = `${ticker.toUpperCase()} - $${parseInt(quote.latest_price).toFixed(2)} | Roberthood`;
    }
  }, [quote])

  useEffect(() => {
      if (news.length < 1) {
        stocksSearch();
        externalApi.get("/api/news/new").then((res) => {
          setNews(prevNews => prevNews.concat(res.data.articles));
        }).catch(console.log);
      }
  }, []); // Add empty dependency array to run only once

  useEffect(() => {
      if (!currentUser || !currentUser.id) return;
      
      portfolioApi.getPortfolio(currentUser.id)
        .then((portfolio) => {
          setPortfolioValue(portfolio);
        })
        .catch((error) => console.log(error));
    }, [currentUser]);

     useEffect(() => {
       if (!currentUser || !currentUser.id) return;
       
       watchlistApi.getWatchlist(currentUser.id)
         .then((watchlist) => {
           setStock(watchlist);
         })
         .catch((error) => console.log(error));
     }, [currentUser]);

     const stocksSearch = () => {
       externalApi.get(`/api/stocks/quote/${searchValue}`)
         .then((response) => {
          console.log("stock quote search: ", response.data);
          // API returns an array, get the first element and map to expected format
          const data = Array.isArray(response.data) ? response.data[0] : response.data;
          if (data && data.price) {
            const mappedQuote = {
              ...data,
              company_name: data.name,
              latest_price: data.price,
              change_percent_s: `${data.changesPercentage ? data.changesPercentage.toFixed(2) : '0.00'}%`
            };
            setQuote(mappedQuote);
            setErrorMessage(""); // Clear error message if quote is found
          } else {
            setQuote({}); // set quote to empty object if not found
            setErrorMessage("Stock data not found. Please try again."); // show error message
          }  
         })
         .catch(error => {
           console.log(error);
           setQuote({});
           setErrorMessage("Error fetching stock data. Please try again.");
         });

       externalApi.get(`/api/stocks/chart/${searchValue}`)
         .then((response) => {
           setChartData(response.data);
         })
         .catch(error => console.log(error));
       
       // Only navigate if we're not already on the target route
       const targetPath = `/stocks/${searchValue}`;
       if (window.location.hash !== `#${targetPath}`) {
         routeChangeStocksPage(targetPath);
       }
     };

     const handleOnChange = (event) => {
       setSearchValue(event.target.value);
     };

     const handleKeyPress = (event) => {
       if (event.key === "Enter") {
         stocksSearch();
       }
     };

     const operation = () => {
       setShow(!show);
     };

       const postDataHandler = () => {
         if (!currentUser || !currentUser.id) return;
         
         watchlistApi
           .addStock(quote, currentUser.id)
           .then(() => {
             document.querySelector(".watchlist_btn").textContent = "Added to Watchlist";
             // Refresh watchlist
             watchlistApi.getWatchlist(currentUser.id).then(setStock).catch(console.log);
           })
           .catch((error) => console.log(error));
       };

       const buyStockHandler = () => {
         if (!currentUser || !currentUser.id) return;
         
         const total = shares * quote.latest_price;
         
         // Check if stock already exists in portfolio
         const existingStock = portfolioValue.find(stock => stock.Company && stock.Company.symbol === quote.symbol);
         
         if (existingStock) {
           // Update existing stock quantity
           portfolioApi
             .updateStock(existingStock.firebaseID, {
               Quantity: parseInt(existingStock.Quantity) + parseInt(shares),
               Total: (parseInt(existingStock.Quantity) + parseInt(shares)) * quote.latest_price
             }, currentUser.id)
             .then(() => {
               document.querySelector(".buy-stock").textContent = "Bought";
               document.querySelector(".buy-stock").disabled = true;
               // Refresh portfolio
               portfolioApi.getPortfolio(currentUser.id).then(setPortfolioValue).catch(console.log);
             })
             .catch(console.log);
           return;
         }

         if (shares >= 1) {
           // Add new stock to portfolio
           portfolioApi
             .addStock({
               Company: quote,
               Quantity: shares,
               Total: total,
             }, currentUser.id)
             .then(() => {
               document.querySelector(".buy-stock").textContent = "Bought";
               document.querySelector(".buy-stock").disabled = true;
               setSharesError(null);
               // Refresh portfolio
               portfolioApi.getPortfolio(currentUser.id).then(setPortfolioValue).catch(console.log);
             })
             .catch((error) => console.log(error));
         } else {
           setSharesError("Please enter valid number of shares.");
         }
       };

      useEffect(() => {
        checkAvailableShares();
      }, [portfolioValue, quote])

      const checkAvailableShares = () => {
        portfolioValue.forEach(stock => {
          if (stock && stock.Company && stock.Company.symbol && quote && quote.symbol && stock.Company.symbol === quote.symbol) {
            setAvailableShares(stock.Quantity); 
          }
        })
      }

      const sellStockHandler = () => {
        if (!currentUser || !currentUser.id) return;
        
        for (const stock of portfolioValue) {
          if (
            stock.Company.symbol === quote.symbol &&
            shares <= stock.Quantity
          ) {
            const newQuantity = parseInt(stock.Quantity) - parseInt(shares);
            
            if (newQuantity <= 0) {
              // Remove stock from portfolio if no shares left
              portfolioApi
                .removeStock(stock.firebaseID, currentUser.id)
                .then(() => {
                  document.querySelector(".stocks-sell-stock").textContent = "Sold";
                  document.querySelector(".stocks-sell-stock").disabled = true;
                  // Refresh portfolio
                  portfolioApi.getPortfolio(currentUser.id).then(setPortfolioValue).catch(console.log);
                  routeChange();
                })
                .catch(console.log);
            } else {
              // Update quantity
              portfolioApi
                .updateStock(stock.firebaseID, {
                  Quantity: newQuantity,
                  Total: newQuantity * quote.latest_price
                }, currentUser.id)
                .then(() => {
                  document.querySelector(".stocks-sell-stock").textContent = "Sold";
                  document.querySelector(".stocks-sell-stock").disabled = true;
                  // Refresh portfolio
                  portfolioApi.getPortfolio(currentUser.id).then(setPortfolioValue).catch(console.log);
                  routeChange();
                })
                .catch(console.log);
            }
            return;
          }
        }
      };

      const watchlistChecker = () => {
           for (let watchlistItem of stock) {
             if (watchlistItem.symbol === quote.symbol) {
               return (
                 <button
                   className="watchlist_btn"
                   onClick={deleteWatchlistItemHandler(watchlistItem)}
                 >
                   Remove from Watchlist
                 </button>
               );
             }
           }

           return (
             <button className="watchlist_btn" onClick={postDataHandler}>
               + Add to Lists
             </button>
           );
         };

      const deleteWatchlistItemHandler = (watchlistItem) => {
        return (event) => {
          event.preventDefault();
          if (!currentUser || !currentUser.id) return;
          
          watchlistApi
            .removeStock(watchlistItem.firebaseID, currentUser.id)
            .then(() => {
              // Refresh watchlist
              watchlistApi.getWatchlist(currentUser.id).then(setStock).catch(console.log);
            })
            .catch((error) => console.log(error));
        };
      };

      const sellAllHandler = (stock) => {
          return (event) => {
            event.preventDefault();
            if (!currentUser || !currentUser.id) return;
            
            portfolioApi
              .removeStock(stock.firebaseID, currentUser.id)
              .then(() => {
                // Refresh portfolio
                portfolioApi.getPortfolio(currentUser.id).then(setPortfolioValue).catch(console.log);
                routeChange();
              })
              .catch((error) => console.log(error));
          };
        
        };

        const stocksPredictiveSearch = (item) => {
          setSearchValue(item.symbol);
          stocksSearch();
          setSearchValue("");
        };

      const sellAllStocksHandler = () => {
         for (let stock of portfolioValue) {
           if (stock && stock.Company && stock.Company.symbol && quote && quote.symbol) {
             console.log(stock.Company.symbol); 
             if (stock.Company.symbol === quote.symbol) {
               return (
                 <button
                   className="sell-all-shares-btn"
                   onClick={sellAllHandler(stock)}
                 >
                   Sell All
                 </button>
               );
             }
           }
         }
         
         return null; // Return null if no matching stock found
      };

  return (
          <div>
            <div className="header">
              <div className="navbar-left">
                <div>
                  <Link to="/dashboard">
                    <img
                      className="dashboard-roberthood-hat"
                      src={roberthoodHatURL}
                    />
                  </Link>
                </div>
                <div className="predictive-search">
                  <div className="search-box">
                    <form>
                      <button onClick={stocksSearch} className="search-btn">
                        <i className="fas fa-search"></i>
                      </button>
                      <input
                        className="search-txt"
                        type="text"
                        name=""
                        placeholder="Search"
                        onChange={(event) => {
                          handleOnChange(event);
                        }}
                        value={searchValue}
                        onKeyPress={handleKeyPress}
                        alt="search"
                      />
                    </form>
                  </div>
                  <div className="auto-suggestions">
                    <ul>
                      {TickerSymbols.map((name) => {
                        if (searchValue.length !== 0) {
                          if (
                            name.symbol
                              .toLowerCase()
                              .startsWith(searchValue.toLowerCase())
                          ) {
                            return (
                              <li
                                key={name.symbol}
                                onClick={() => stocksPredictiveSearch(name)}
                              >
                                <strong style={{ paddingRight: "3rem" }}>
                                  {name.symbol}
                                </strong>
                                {name.name}
                              </li>
                            );
                          } else {
                            return null;
                          }
                        }
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <nav className="nav-bar">
                  <a href="https://angel.co/u/ben-hsieh-6" target="_blank">
                    <span className="nav-menu-item">AngelList</span>
                  </a>
                  <a href="https://github.com/benhsieh-dev" target="_blank">
                    <span className="nav-menu-item">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ben-hsieh-05522542/"
                    target="_blank"
                  >
                    <span className="nav-menu-item">Linkedin</span>{" "}
                  </a>
                  <Link to="/dashboard">
                    <span className="nav-menu-item">Portfolio</span>
                  </Link>
                  <div className="dropdown">
                    <button
                      className="nav-menu-item dropdown"
                      onClick={operation}
                    >
                      Account
                    </button>
                    {show && (
                      <ul className="dropdown-menu">
                        <li>
                          <div>Ben Hsieh</div>
                          <hr className="horizontal-bar" />
                        </li>
                        <li className="dropdown-list">
                          <i class="fab fa-angellist menu-icon"></i>
                          <a
                            href="https://angel.co/u/ben-hsieh-6"
                            target="_blank"
                          >
                            <span className="dropdown-menu-item">
                              AngelList
                            </span>
                          </a>
                        </li>
                        <li className="dropdown-list">
                          <i class="fab fa-github menu-icon"></i>
                          <a
                            href="https://github.com/benhsieh-dev"
                            target="_blank"
                          >
                            <span className="dropdown-menu-item">GitHub</span>
                          </a>
                        </li>
                        <li className="dropdown-list">
                          <i class="fab fa-linkedin-in menu-icon"></i>
                          <a
                            href="https://www.linkedin.com/in/ben-hsieh-05522542/"
                            target="_blank"
                          >
                            <span className="dropdown-menu-item">Linkedin</span>
                          </a>
                        </li>
                        <li className="dropdown-list">
                          <i className="fas fa-briefcase menu-icon"></i>
                          <Link to="/account">
                            <span className="dropdown-menu-item">Account</span>
                          </Link>
                        </li>
                        <li className="dropdown-list">
                          <i className="fas fa-sign-out-alt menu-icon"></i>
                          <span
                            className="dropdown-menu-item logout"
                            onClick={logout}
                          >
                            Log Out
                          </span>
                        </li>
                      </ul>
                    )}
                  </div>
                </nav>
              </div>
            </div>
            <br />
            <br />

            {/* Display an error message if no quote is found */}
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            
            <div className="stocks-page">
              <div className="stocks-left">
                <div>
                  {quote && quote.company_name ? (
                    <>
                      <h2>{quote.company_name}</h2>
                      <p>
                        ${JSON.stringify(quote.latest_price)}
                        <br />${JSON.stringify(quote.change)}(
                        {JSON.stringify(quote.change_percent_s)}) Today
                      </p>
                    </>
                  ) : (
                    <div>Loading stock data...</div>
                  )}
                </div>
                <div className="Chart">
                  <LineChart width={800} height={400} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="minute" />
                    <YAxis type="number" domain={["auto", "auto"]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="close" stroke="#8884d8" />
                  </LineChart>
                </div>

                <div className="news">
                  <ul>
                    {news.map((item, idx) => {
                      return (
                        <li key={idx} className="news-item">
                          <div>
                            <i className="fas fa-bolt"></i>
                            {"\u00A0"}
                            {"\u00A0"}
                            <strong>{item.source.name}</strong>
                            {"\u00A0"}
                            {"\u00A0"}
                            {item.publishedAt}
                          </div>
                          <div className="news-title">
                            <div>
                              <a
                                className="news-title-header"
                                href={item.url}
                                target="_blank"
                              >
                                {item.title}
                              </a>
                            </div>
                            <div>
                              <img
                                className="news-image"
                                src={item.urlToImage}
                              />
                            </div>
                          </div>
                          <hr />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="stocks-right">
                {availableShares === 0 ? (
                  <div className="stocks-trade">
                    <strong>Buy {quote.symbol}</strong>
                    <div className="account-stock-purchase">
                      Shares{" "}
                      <input
                        value={shares}
                        className="account-purchase-shares"
                        type="number"
                        min="0"
                        step="1"
                        onChange={(e) => setShares(e.target.value)}
                      ></input>
                    </div>

                    <br />
                    <hr />
                    <div>Market Price:</div>
                    <br />
                    <div className="market-price">
                      ${parseInt(quote.latest_price).toFixed(2)}
                    </div>
                    {/* {console.log(typeof quote.latest_price)} */}
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <button className="buy-stock" onClick={buyStockHandler}>
                      Buy
                    </button>
                    <br />
                    <hr />
                    <br />
                    <br />
                    <div className="available-shares">
                      {availableShares}{" "}
                      {availableShares <= 1 ? "Share" : "Shares"} Available
                      {"\xa0"}
                      {sellAllStocksHandler()}
                    </div>
                    <br />
                    <div className="account-purchase-shares-error">
                      {sharesError}
                    </div>
                    <br />
                    {watchlistChecker()}
                  </div>
                ) : (
                  <Tabs
                    defaultIndex={1}
                    // onSelect={(index) => console.log(index)}
                  >
                    <TabList className="tabs-list">
                      <Tab className="buy-stock-tab">
                        <strong>Buy {quote.symbol}</strong>
                      </Tab>
                      <Tab className="sell-stock-tab">
                        <strong>Sell {quote.symbol}</strong>
                      </Tab>
                    </TabList>

                    <TabPanel>
                      <div className="stocks-trade">
                        <div className="account-stock-purchase">
                          Shares{" "}
                          <input
                            value={shares}
                            className="account-purchase-shares"
                            type="number"
                            min="0"
                            step="1"
                            onChange={(e) => setShares(e.target.value)}
                          ></input>
                        </div>

                        <br />
                        <hr />
                        <div>Market Price:</div>
                        <br />
                        <div className="market-price">
                          ${quote.latest_price}
                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <button className="buy-stock" onClick={buyStockHandler}>
                          Buy
                        </button>
                        <br />
                        <hr />
                        <br />
                        <br />
                        <div className="account-purchase-shares-error">
                          {sharesError}
                        </div>
                        <br />
                        {watchlistChecker()}
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div className="stocks-trade">
                        <div className="account-stock-purchase">
                          Shares{" "}
                          <input
                            value={shares}
                            className="account-purchase-shares"
                            type="number"
                            min="0"
                            step="1"
                            onChange={(e) => setShares(e.target.value)}
                          ></input>
                        </div>

                        <br />
                        <hr />
                        <div>Market Price:</div>
                        <br />
                        <div className="market-price">
                          ${quote.latest_price}
                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <button
                          className="stocks-sell-stock"
                          onClick={sellStockHandler}
                        >
                          Sell
                        </button>
                        <br />
                        <hr />
                        <br />
                        <br />
                        <div className="available-shares">
                          {availableShares}{" "}
                          {availableShares <= 1 ? "Share" : "Shares"} Available
                          - {"\xa0"}
                          {sellAllStocksHandler()}
                        </div>
                        <br />
                        <div className="account-purchase-shares-error">
                          {sharesError}
                        </div>
                        <br />
                        {watchlistChecker()}
                      </div>
                    </TabPanel>
                  </Tabs>
                )}

                <br />
              </div>
            </div>
          </div>
        );

 
     
}

 