import React, { useState, useEffect } from 'react'; 
import { Link, useHistory } from 'react-router-dom';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, YAxis } from "recharts";

import axios from '../axios-quotes'; 

import { TickerSymbols } from '../../../public/tickers.js';

export default ({ currentUser, logout }) => {
  const [searchValue, setSearchValue] = useState('')
  const [quote, setQuote] = useState('qqq')
  console.log("currentUser username", currentUser.username); 
  const [chartData, setChartData] = useState([]);
  const [news, setNews] = useState([]);
  const [show, setShow] = useState(false); 
  const [portfolioValue, setPortfolioValue] = useState([]);
  const [stock, setStock] = useState([]); 
  const [shares, setShares] = useState(0);
  const [sharesError, setSharesError] = useState(null);

  useEffect(() => {
    document.title = 'Portfolio | Roberthood'; 
  }, [])

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    if (news.length < 1) {
      $.ajax("/api/news/new").done((res) => {
        if (isMounted) { // Only update state if the component is still mounted
          setNews(news.concat(res.articles));
        }     
      });
    }

    $.ajax(`/api/stocks/chart/${quote}`).done((res) => {
       if (isMounted) setChartData(res);
    });

    $.ajax(`/api/stocks/quote/${quote}`).done((res) => {
       if (isMounted) setQuote(res);
    });

    return () => {
      isMounted = false;
    }
  }, [quote, news]);

    useEffect(() => {
      let isMounted = true;

      axios({
        method: "GET",
        url: `https://roberthood-edcdd.firebaseio.com/portfolios/${currentUser.username}.json`,
      })
        .then((res) => {
          if (isMounted) {
            const total = [];
            for (let stock in res.data) {
              total.push({ ...res.data[stock], firebaseID: stock });
            }
            setPortfolioValue(total);
          }
        })
        .catch((error) => console.log(error));
        return () => {
          isMounted = false; 
        }
    }, []); // should change when portfolio changes


  useEffect(() => {
    let isMounted = true;

    axios({
      method: 'GET',
      url: `https://roberthood-edcdd.firebaseio.com/${currentUser.username}.json`})
    .then(res => { 
      // console.log(res); 
      if (isMounted) {
          const watchlist = [];
          for (let stock in res.data) {
            watchlist.push({ ...res.data[stock], firebaseID: stock });
          }
          setStock(watchlist);
      }
    }) 
    .catch(error => console.log(error));  

    return () => {
      isMounted = false; 
    }
  }, []); // should change when watchlist changes

  const dashboardSearch = () => {
    $.ajax(`/api/stocks/quote/${searchValue}`).done(res => {
      console.log(res); 
      setQuote(res); 
    });

    $.ajax(`/api/stocks/chart/${searchValue}`).done(res => {
      setChartData(res);
    });
    routeChangeDashboardStocksPage(`/stocks/${searchValue}`);
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
  axios.post(`./${currentUser.username}.json`, quote)
    .then(document.querySelector('.watchlist_btn')
    .textContent = "Added to Watchlist")
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
      axios
        .delete(`./${currentUser.username}/${watchlistItem.firebaseID}.json`)
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
                 {TickerSymbols.map((name) => {
                   {
                     /* if (searchValue.length !== 0 && searchValue !== "qqq") { */
                   }
                   if (searchValue.length !== 0) {
                     if (
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

             <Link to="/signup">
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
                     <i class="fas fa-university menu-icon"></i>
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
                 <li>
                   <h1>
                     {/* console.log(quote) */}
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
                 {/* 
                 <li>
                   <span>PE ratio:</span>
                   {quote.pe_ration ? JSON.stringify(quote.pe_ratio) : "N/A"}
                 </li>
                 */}
                 <li>
                   <span>YTD change:</span>{" "}
                   {(quote.ytd_change * 100).toFixed(2)}%
                 </li>
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
}
     
 




  
  
