import React, {useState, useEffect} from 'react';
import { Link, useParams, useHistory, NavLink } from 'react-router-dom';

import { firebaseApi } from '../../utils/api';

import { TickerSymbols } from '../../../public/tickers';

export default ({ currentUser, logout }) => {
    const [searchValue, setSearchValue] = useState("");
    const [quote, setQuote] = useState("");
    // console.log("currentUser", currentUser); 
    const [show, setShow] = useState(false); 
    const [portfolioValue, setPortfolioValue] = useState([]);
    const [stock, setStock] = useState([]);
    const [shares, setShares] = useState(0); 
    const [sharesError, setSharesError] = useState(null);

    const ticker = useParams();
     
  useEffect(() => {
    document.title = 'Account | Robinhood'; 
  })

  useEffect(() => {
    firebaseApi.get(`/portfolios/${currentUser.username}.json`)
      .then((res) => {
        const total = [];
        for (let stock in res.data) {
          total.push({ ...res.data[stock], firebaseID: stock })
        }
        setPortfolioValue(total);
        // console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, [portfolioValue]);

  useEffect(() => {
    firebaseApi.get(`/${currentUser.username}.json`)
      .then((res) => {
        const watchlist = [];
        for (let stock in res.data) {
          watchlist.push({ ...res.data[stock], firebaseID: stock });
        }
        setStock(watchlist);
        // console.log(res.data);
      })
      .catch((error) => console.log(error));
  });

  const accountSearch = () => {
    $.ajax(`/api/stocks/quote/${searchValue}`).done((res) => {
      console.log(res);
      setQuote(res);
    });

    $.ajax(`/api/stocks/chart/${searchValue}`).done((res) => {
      // console.log(res);
      setChartData(res);
    });
    routeChangeAccountStocksPage(`/stocks/${searchValue}`);
  };

  const handleOnChange = (event) => {
      setSearchValue(event.target.value);
    };

  const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        accountSearch();
      }
    };

  const operation = () => {
      setShow(!show);
    };

  const postDataHandler = () => {
    firebaseApi
      .post(`./${currentUser.username}.json`, quote)
      .then(response => {
        document.querySelector(".watchlist_btn")
          .textContent = "Added to Watchlist";
      })
      .catch((error) => console.log(error));
  };

  const history = useHistory();
  const routeChangeAccountStocksPage = (ticker) => {
    let path = ticker;
    history.push(path);
  }; 

  const buyStockHandler = () => {
    const total = shares * quote.latest_price; 
    for (const stock of portfolioValue) {
        if (stock.Company.symbol === quote.symbol) {
          axios
            .patch(`./portfolios/${currentUser.username}/${stock.firebaseID}.json`, {
              Quantity: parseInt(stock.Quantity) + parseInt(shares),
            })
            .then((document.querySelector(".buy-stock").textContent = "Bought"))
            .then((document.querySelector(".buy-stock").disabled = true));
          return
        } 
    }

    if (shares >= 1) {
      axios
        .post(`./portfolios/${currentUser.username}.json`, {Company: quote, Quantity: shares, Total: total})
        // .then(response => console.log(response))
        .then(document.querySelector(".buy-stock").textContent = "Bought")
        .then(setSharesError(null))
        .then(document.querySelector(".buy-stock").disabled=true)
        // .then(routeChange())
        .catch((error) => console.log(error));
    } else {
      setSharesError("Please enter valid number of shares.");
    }
  };

  const sellStockHandler = (stock) => {
    return (
      (event) => {
      event.preventDefault();
      axios
        .delete(`./portfolios/${currentUser.username}/${stock.firebaseID}.json`)
        .catch((error) => console.log(error));
      }
    )
  };

  const watchlistChecker = () => {
    for (let watchlistItem of stock) {
      if (watchlistItem.symbol === quote.symbol) {
        return (
          <button
            className="watchlist_btn"
            onClick={deleteWatchlistItemHandler(watchlistItem)}
          >
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
  };

  const deleteWatchlistItemHandler = (watchlistItem) => {
    return (event) => {
      event.preventDefault();
      axios
        .delete(`./${currentUser.username}/${watchlistItem.firebaseID}.json`)
        .catch((error) => console.log(error));
    };
  };

  const predictiveSearch = (item) => {
    setSearchValue(item.symbol);
    accountSearch(); 
    ;
    setSearchValue('');
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
                  <button onClick={accountSearch} className="search-btn">
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
                {/* {searchValue ? <strong>Stocks</strong> : ""} */}
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
              <Link to="/dashboard">
                <span className="nav-menu-item">Portfolio</span>
              </Link>
              <div className="dropdown">
                <button className="nav-menu-item dropdown" onClick={operation}>
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
                      <a href="https://angel.co/u/ben-hsieh-6" target="_blank">
                        <span className="dropdown-menu-item">AngelList</span>
                      </a>
                    </li>
                    <li className="dropdown-list">
                      <i class="fab fa-github menu-icon"></i>
                      <a href="https://github.com/benhsieh-dev" target="_blank">
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
        <br />
        <br />
        <div>
          <div className="user-account">
            <h1>
              {currentUser.first_name} {currentUser.last_name}
            </h1>
            <nav className="user-nav-bar">
              <NavLink to="/account" className="account-page-link">
                Account
              </NavLink>
              <NavLink to="/account/banking" className="account-page-link">
                Banking
              </NavLink>
              <a
                href="https://angel.co/u/ben-hsieh-6"
                className="account-page-link"
                target="_blank"
              >
                Angel List
              </a>
              <a
                href="https://github.com/benhsieh-dev"
                className="account-page-link"
                target="_blank"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ben-hsieh-05522542/"
                className="account-page-link"
                target="_blank"
              >
                LinkedIn
              </a>
              <a
                href="https://benhsieh-dev.github.io/"
                className="account-page-link"
                target="_blank"
              >
                Personal Site
              </a>
            </nav>
          </div>

          <hr />

          <div>
            <li className="portfolio-value-header">Total Portfolio Value</li>
            <div className="portfolio-container">
              <div>
                <br />
                <div className="total-portfolio-value">
                  $
                  {portfolioValue
                    .map((a) => a.Total)
                    .reduce((a, b) => a + b, 0)
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>

                <br />
                <br />
                <br />
                <span className="stocks-section">Stocks</span>
                <br />
                <br />
                <div className="portfolio">
                  <table className="portfolio-item">
                    <tr className="portfolio-header">
                      <td>Name</td>
                      <td>Symbol</td>
                      <td>Shares</td>
                      <td>Price</td>
                      <td>Day's Percentge Change</td>
                    </tr>
                    <hr />
                    {portfolioValue.map((item, idx) => (
                      <div key={idx} className="shares-information">
                        <Link to={`/stocks/${item.Company.symbol}`}>
                          <tr className="company-details">
                            <td>
                              <strong>{item.Company.company_name}</strong>
                            </td>
                            <td>{item.Company.symbol}</td>
                            <td>{item.Quantity}</td>
                            <td>${item.Company.latest_price.toFixed(2)}</td>
                            <td>{item.Company.change_percent_s}</td>
                          </tr>
                        </Link>

                        <button
                          className="sell-stock"
                          onClick={sellStockHandler(item)}
                        >
                          Sell All
                        </button>
                        <br />
                      </div>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      </div>
    );
}
