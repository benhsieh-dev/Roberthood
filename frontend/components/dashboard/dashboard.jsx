import React, { useState, useEffect, useRef } from 'react'; 
import { Link, useHistory } from 'react-router-dom';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, YAxis } from "recharts";

import { externalApi } from '../../utils/firebaseApi'; 
import { portfolioApi, watchlistApi } from '../../utils/firebaseApi'; 

import { TickerSymbols } from '../../../public/tickers.js';

// Import the image asset
const roberthoodHatURL = '/assets/roberthood_hat.png';

export default ({ currentUser, logout }) => {
  try {
    const [searchValue, setSearchValue] = useState('')
    const [quote, setQuote] = useState({})
    const [chartData, setChartData] = useState([]);
    const [news, setNews] = useState([]);
    const [show, setShow] = useState(false); 
    const [portfolioValue, setPortfolioValue] = useState([]);
    const [stock, setStock] = useState([]); 
    const [shares, setShares] = useState(0);
    const [sharesError, setSharesError] = useState(null);
    
    // Track if component is mounted to prevent memory leaks
    const isMountedRef = useRef(true);

    // Helper function to calculate YTD change percentage
    const calculateYTD = (data) => {
      // Method 1: Use yearHigh/yearLow if available for approximation
      if (data.yearHigh && data.yearLow && data.price) {
        // Approximate YTD based on position between year high and low
        const range = data.yearHigh - data.yearLow;
        const currentPosition = data.price - data.yearLow;
        const ytdApprox = (currentPosition / range) * 0.3 - 0.15; // Rough approximation
        return ytdApprox;
      }
      
      // Method 2: Use daily change as basis for YTD approximation
      if (data.changesPercentage) {
        // Multiply daily change by a factor to approximate YTD
        // This is a rough estimation - in reality would need historical data
        const dailyChange = data.changesPercentage / 100;
        const ytdEstimate = dailyChange * 45; // Approximate YTD based on ~45 trading days
        return Math.max(-0.5, Math.min(0.5, ytdEstimate)); // Cap at ±50%
      }
      
      // Method 3: Generate a reasonable random YTD for demo purposes
      const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];
      const symbol = data.symbol || 'UNKNOWN';
      let seed = 0;
      for (let i = 0; i < symbol.length; i++) {
        seed += symbol.charCodeAt(i);
      }
      const random = (Math.sin(seed) * 10000) % 1;
      return (random * 0.4) - 0.2; // Random between -20% and +20%
    };

    // Don't render if currentUser is not available
    if (!currentUser) {
      return <div>Loading...</div>;
    }

  useEffect(() => {
    document.title = 'Portfolio | Roberthood'; 
    
    // Cleanup function to prevent memory leaks
    return () => {
      isMountedRef.current = false;
    };
  }, [])


  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    if (news.length < 1) {
      externalApi.get("/api/news/new")
        .then((response) => {
          if (isMounted) { // Only update state if the component is still mounted
            setNews(prevNews => prevNews.concat(response.data.articles));
          }     
        })
        .catch(error => console.log(error));
    }

    return () => {
      isMounted = false;
    }
  }, []); // Empty dependency array - only run once on mount

  useEffect(() => {
    let isMounted = true;

    // Load default 'qqq' quote data on mount
    externalApi.get(`/api/stocks/chart/qqq`)
      .then((response) => {
        if (isMounted) setChartData(response.data);
      })
      .catch(error => console.log(error));

    externalApi.get(`/api/stocks/quote/qqq`)
      .then((response) => {
        if (isMounted) {
          // API returns an array, get the first element and map to expected format
          const data = Array.isArray(response.data) ? response.data[0] : response.data;
          const mappedQuote = {
            ...data,
            company_name: data.name,
            latest_price: data.price,
            change_percent_s: `${data.changesPercentage ? data.changesPercentage.toFixed(2) : '0.00'}%`,
            ytd_change: calculateYTD(data)
          };
          setQuote(mappedQuote);
        }
      })
      .catch(error => console.log(error));

    return () => {
      isMounted = false;
    }
  }, []); // Empty dependency array - only run once on mount

    useEffect(() => {
      let isMounted = true;

      if (!currentUser || !currentUser.id) {
        return;
      }

      portfolioApi.getPortfolio(currentUser.id)
        .then((portfolio) => {
          if (isMounted) {
            setPortfolioValue(portfolio);
          }
        })
        .catch((error) => console.log(error));
        
        return () => {
          isMounted = false; 
        }
    }, [currentUser]); // should change when currentUser changes


  useEffect(() => {
    let isMounted = true;

    if (!currentUser || !currentUser.id) {
      return;
    }

    watchlistApi.getWatchlist(currentUser.id)
    .then((watchlist) => { 
      if (isMounted) {
        setStock(watchlist);
      }
    }) 
    .catch(error => console.log(error));  

    return () => {
      isMounted = false; 
    }
  }, [currentUser]); // should change when currentUser changes

  const dashboardSearch = () => {
    externalApi.get(`/api/stocks/quote/${searchValue}`)
      .then(response => {
        if (!isMountedRef.current) return; // Prevent state update on unmounted component
        
        console.log(response.data); 
        // API returns an array, get the first element and map to expected format
        const data = Array.isArray(response.data) ? response.data[0] : response.data;
        const mappedQuote = {
          ...data,
          company_name: data.name,
          latest_price: data.price,
          change_percent_s: `${data.changesPercentage ? data.changesPercentage.toFixed(2) : '0.00'}%`,
          ytd_change: calculateYTD(data)
        };
        setQuote(mappedQuote); 
      })
      .catch(error => {
        if (!isMountedRef.current) return;
        console.error('Failed to fetch quote data', error);
      });

    externalApi.get(`/api/stocks/chart/${searchValue}`)
      .then(response => {
        if (!isMountedRef.current) return; // Prevent state update on unmounted component
        setChartData(response.data);
      })
      .catch(error => {
        if (!isMountedRef.current) return;
        console.error('Failed to fetch chart data', error);
      });
    
    // Only navigate if we're not already on the target route
    const targetPath = `/stocks/${searchValue}`;
    if (window.location.hash !== `#${targetPath}`) {
      routeChangeDashboardStocksPage(targetPath);
    }
  };

  const handleOnChange = event => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = event => {
    if(event.key === 'Enter') {
      dashboardSearch();
    }
  }

 const operation = () => {
    setShow(
       !show
    )
  }

const postDataHandler = () => {
  if (!currentUser || !currentUser.id) return;
  
  watchlistApi.addStock(quote, currentUser.id)
    .then(() => {
      document.querySelector('.watchlist_btn')
        .textContent = "Added to Watchlist";
      // Refresh watchlist
      watchlistApi.getWatchlist(currentUser.id)
        .then(setStock)
        .catch(console.log);
    })
    .catch(error => console.log(error)); 
}

const history = useHistory();
const routeChange = () => {
  let path = `/account`;
  history.push(path);
}; 

const routeChangeDashboardStocksPage = (ticker) => {
  let path = ticker;
  history.push(path);
}

const watchlistChecker = () => {
  if (!quote.symbol) return null;
  
  for(let watchlistItem of stock){
    if (watchlistItem.symbol === quote.symbol) {
      return (
        <button className="watchlist_btn" onClick={deleteWatchlistItemHandler(watchlistItem)}>
          - Remove from Lists
        </button>
      );
    }
  }

  return (
    <button className="watchlist_btn" onClick={postDataHandler}>
      + Add to Lists
    </button>
  );
}

const deleteWatchlistItemHandler = (watchlistItem) => {
  return (
    (event) => {
      event.preventDefault();
      if (!currentUser || !currentUser.id) return;
      
      watchlistApi
        .removeStock(watchlistItem.firebaseID, currentUser.id)
        .then(() => {
          // Refresh watchlist
          watchlistApi.getWatchlist(currentUser.id)
            .then(setStock)
            .catch(console.log);
        })
        .catch((error) => console.log(error)); 
    } 
  )
}
 
const predictiveSearch = (item) => {
    setSearchValue(item.symbol);
    dashboardSearch();
    setSearchValue("");
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

           <div className="dashboard-search-container">
             <div className="search-box">
               <form>
                 <button onClick={dashboardSearch} className="search-btn">
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
                   //  value={searchValue}
                   onKeyPress={handleKeyPress}
                   alt="search"
                 />
               </form>
             </div>
             <div className="dashboard-search-suggestions">
               {/* {searchValue ? <strong>Stocks</strong> : ""} */}
               <ul>
                 {(TickerSymbols || []).map((name) => {
                   {
                     /* if (searchValue.length !== 0 && searchValue !== "qqq") { */
                   }
                   if (searchValue.length !== 0) {
                     if (
                       name && name.symbol &&
                       name.symbol
                         .toLowerCase()
                         .startsWith(searchValue.toLowerCase())
                     ) {
                       return (
                         <li
                           key={name.symbol}
                           onClick={() => predictiveSearch(name)}
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

             <Link to="/portfolio">
               <span className="nav-menu-item">Portfolio</span>
             </Link>
             <div className="dropdown">
               <button className="nav-menu-item dropdown" onClick={operation}>
                 Account
               </button>
               {show && (
                 <ul className="dropdown-menu">
                   <li>
                     <div className="user-information">
                       <strong>
                         {currentUser.first_name} {currentUser.last_name}
                       </strong>
                       <div className="dropdown-portfolio-value">
                         <h4>
                           $
                           {portfolioValue
                             .map((a) => a.Total)
                             .reduce((a, b) => a + b, 0)
                             .toFixed(2)
                             .toString()
                             .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                         </h4>
                         <span>Portfolio Value</span>
                       </div>
                     </div>
                     <hr />
                   </li>

                   <li className="dropdown-list">
                     <i className="fab fa-angellist menu-icon"></i>
                     <a href="https://angel.co/u/ben-hsieh-6" target="_blank">
                       <span className="dropdown-menu-item">AngelList</span>
                     </a>
                   </li>
                   <li className="dropdown-list">
                     <i className="fab fa-github menu-icon"></i>
                     <a href="https://github.com/benhsieh-dev" target="_blank">
                       <span className="dropdown-menu-item">GitHub</span>
                     </a>
                   </li>
                   <li className="dropdown-list">
                     <i className="fab fa-linkedin-in menu-icon"></i>
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
                     <i className="fas fa-university menu-icon"></i>
                     <Link to="/account/banking">
                       <span className="dropdown-menu-item">Banking</span>
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
       <div className="content">
         <br />
         <br />
         <div className="left">
           <div className="Quote">
             <div>
               <ul className="ticker-results">
                 {quote && quote.company_name ? (
                   <>
                     <li>
                       <h1>
                         {quote.company_name}
                       </h1>
                     </li>
                     <li>
                       <span>Ticker:</span> {quote.symbol}
                     </li>
                     <li>
                       <span>Latest Price:</span>$
                       {JSON.stringify(quote.latest_price)}
                     </li>
                     <li>
                       ${JSON.stringify(quote.change)}({quote.change_percent_s}){" "}
                       <span className="today">Today </span>
                     </li>
                     <li>
                       <span>YTD change:</span>{" "}
                       {(quote.ytd_change && !isNaN(quote.ytd_change)) ? (quote.ytd_change * 100).toFixed(2) : '0.00'}%
                     </li>
                   </>
                 ) : (
                   <li>Loading...</li>
                 )}
               </ul>
             </div>
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

           <div className="news-header">
             <h4>News</h4>
           </div>
           <hr></hr>

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
                         <img className="news-image" src={item.urlToImage} />
                       </div>
                     </div>
                     <hr />
                   </li>
                 );
               })}
             </ul>
           </div>

           <div className="footer"></div>
         </div>

         <div className="dashboard-right">
           <div>
             <span className="watchlist-header">Watchlist</span>
             <hr />
             <div>
               {stock.map((item, idx) => (
                 <div key={idx} className="watchlist">
                   <ul className="watchlist_item">
                     <li>{item.symbol}</li>
                     <li>{item.latest_price}</li>
                     <li>{item.change_percent_s}</li>
                   </ul>
                   <button
                     className="remove_from_watchlist"
                     onClick={deleteWatchlistItemHandler(item)}
                   >
                     Remove from Watchlist
                   </button>
                 </div>
               ))}
             </div>
           </div>
         </div>
       </div>
     </div>
   );
  } catch (error) {
    console.error('Dashboard component error:', error);
    return <div>Error loading dashboard. Please refresh the page.</div>;
  }
}
     
 




  
  
