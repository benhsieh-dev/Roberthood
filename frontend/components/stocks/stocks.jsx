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

import axios from "../axios-quotes";

import { TickerSymbols } from "../../../public/tickers";

export default ({currentUser, logout}) => {

   const { ticker } = useParams(); 

   const [searchValue, setSearchValue] = useState(ticker);
   const [quote, setQuote] = useState("");
   const [chartData, setChartData] = useState([]);
   const [news, setNews] = useState([]);
   const [show, setShow] = useState(false);
   const [portfolioValue, setPortfolioValue] = useState([]);
   const [stock, setStock] = useState([]);
   const [shares, setShares] = useState(0);
   const [availableShares, setAvailableShares] = useState(0);
   const [sharesError, setSharesError] = useState(null);


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
       if (news.length < 1) {
         stocksSearch();
         $.ajax("/api/news/new").done((res) => {
           setNews(news.concat(res.articles));
         });
       }
     });

    useEffect(() => {
       axios({
         method: "GET",
         url: `https://roberthood-edcdd.firebaseio.com/portfolios/${currentUser.username}.json`,
       })
         .then((res) => {
           const total = [];
           for (let stock in res.data) {
             total.push({ ...res.data[stock], firebaseID: stock });
           }
           setPortfolioValue(total);
         })
         .catch((error) => console.log(error));
     }, [portfolioValue]);

     useEffect(() => {
       axios({
         method: "GET",
         url: `https://roberthood-edcdd.firebaseio.com/${currentUser.username}.json`,
       })
         .then((res) => {
           const watchlist = [];
           for (let stock in res.data) {
             watchlist.push({ ...res.data[stock], firebaseID: stock });
           }
           setStock(watchlist);
         })
         .catch((error) => console.log(error));
     });

     const stocksSearch = () => {
       $.ajax(`/api/stocks/quote/${searchValue}`).done((res) => {
         setQuote(res);
       });

       $.ajax(`/api/stocks/chart/${searchValue}`).done((res) => {
         setChartData(res);
       });
       routeChangeStocksPage(`/stocks/${searchValue}`);
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
         axios
           .post(`./${currentUser.username}.json`, quote)
           .then(
             (document.querySelector(".watchlist_btn").textContent =
               "Added to Watchlist")
           )
           .catch((error) => console.log(error));
       };

       const buyStockHandler = () => {
         const total = shares * quote.latest_price;
         for (const stock of portfolioValue) {
           if (stock.Company.symbol === quote.symbol) {
             axios
               .patch(
                 `./portfolios/${currentUser.username}/${stock.firebaseID}.json`,
                 {
                   Quantity: parseInt(stock.Quantity) + parseInt(shares),
                 }
               )
               .then(
                 (document.querySelector(".buy-stock").textContent = "Bought")
               )
               .then((document.querySelector(".buy-stock").disabled = true));
             return;
           }
         }

         if (shares >= 1) {
           axios
             .post(`./portfolios/${currentUser.username}.json`, {
               Company: quote,
               Quantity: shares,
               Total: total,
             })
             .then(
               (document.querySelector(".buy-stock").textContent = "Bought")
             )
             .then(setSharesError(null))
             .then((document.querySelector(".buy-stock").disabled = true))
             .catch((error) => console.log(error));
         } else {
           setSharesError("Please enter valid number of shares.");
         }
       };

      useEffect(() => {
        checkAvailableShares();
      })

      const checkAvailableShares = () => {
        portfolioValue.forEach(stock => {
          if (stock.Company.symbol === quote.symbol) setAvailableShares(stock.Quantity); 
        })
      }

      const sellStockHandler = () => {
        const total = shares * quote.latest_price;
          for (const stock of portfolioValue) {
            if (
              stock.Company.symbol === quote.symbol &&
              shares <= stock.Quantity
            ) {
              axios
                .patch(
                  `./portfolios/${currentUser.username}/${stock.firebaseID}.json`,
                  {
                    Quantity: parseInt(stock.Quantity) - parseInt(shares),
                  }
                )
                .then(
                  (document.querySelector(".stocks-sell-stock").textContent =
                    "Sold")
                )
                .then(
                  (document.querySelector(".stocks-sell-stock").disabled = true)
                )
                .then(routeChange());
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
               Add to Watchlist
             </button>
           );
         };

      const deleteWatchlistItemHandler = (watchlistItem) => {
        return (event) => {
          event.preventDefault();
          axios
            .delete(
              `./${currentUser.username}/${watchlistItem.firebaseID}.json`
            )
            .catch((error) => console.log(error));
        };
      };

      const sellAllHandler = (stock) => {
          return (event) => {
            event.preventDefault();
            axios
              .delete(
                `./portfolios/${currentUser.username}/${stock.firebaseID}.json`
              )
              .then(routeChange())
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
                  <a href="https://angel.co/u/ben-hsieh-6">
                    <span className="nav-menu-item">AngelList</span>
                  </a>
                  <a href="https://github.com/benhsieh-dev">
                    <span className="nav-menu-item">GitHub</span>
                  </a>
                  <a href="https://www.linkedin.com/in/ben-hsieh-05522542/">
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
                          <a href="https://angel.co/u/ben-hsieh-6">
                            <span className="dropdown-menu-item">
                              AngelList
                            </span>
                          </a>
                        </li>
                        <li className="dropdown-list">
                          <i class="fab fa-github menu-icon"></i>
                          <a href="https://github.com/benhsieh-dev">
                            <span className="dropdown-menu-item">GitHub</span>
                          </a>
                        </li>
                        <li className="dropdown-list">
                          <i class="fab fa-linkedin-in menu-icon"></i>
                          <a href="https://www.linkedin.com/in/ben-hsieh-05522542/">
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
            <div className="stocks-page">
              <div className="stocks-left">
                <div>
                  <h2>{quote.company_name}</h2>
                  <p>
                    ${JSON.stringify(quote.latest_price)}
                    <br />${JSON.stringify(quote.change)}(
                    {JSON.stringify(quote.change_percent_s)}) Today
                  </p>
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
                    <div className="market-price">${quote.latest_price}</div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <button
                      className="stocks-sell-stock"
                      onClick={buyStockHandler}
                    >
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
                    onSelect={(index) => console.log(index)}
                  >
                    <TabList>
                      <Tab>Buy COST</Tab>   
                      <Tab>Sell COST</Tab>
                    </TabList>

              
                    <TabPanel>   
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
                        <div className="market-price">${quote.latest_price}</div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <button
                          className="stocks-sell-stock"
                          onClick={buyStockHandler}
                        >
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
                        <strong>Sell {quote.symbol}</strong>
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
                        <div className="market-price">${quote.latest_price}</div>
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
                          {availableShares <= 1 ? "Share" : "Shares"} Available -{" "}
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
                    </TabPanel>
                  </Tabs>
                )}

                <br />
              </div>
            </div>
          </div>
        );

 
     
}

 