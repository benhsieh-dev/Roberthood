import React, { useState, useEffect } from "react";
import { Link, NavLink, useParams, useHistory } from "react-router-dom";

import { firebaseApi } from '../../utils/api';
import { cashBalanceApi } from '../../utils/firebaseApi';

import { TickerSymbols } from "../../../public/tickers";

// Import the image asset
const roberthoodHatURL = '/assets/roberthood_hat.png';

export default ({ currentUser, logout }) => {
  const [searchValue, setSearchValue] = useState("");
  const [quote, setQuote] = useState("");
  // console.log("currentUser", currentUser);
  const [show, setShow] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState([]);
  const [stock, setStock] = useState([]);

  const ticker = useParams();

  const [fromAccountState, setFromAccountState] = useState("Cathay Bank");
  const [toAccountState, setToAccountState] = useState("Roberthood");

  const [currentCashBalance, setCurrentCashBalance] = useState(0);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferStatus, setTransferStatus] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    document.title = "Account | Robinhood";
  });

  // Load current cash balance
  useEffect(() => {
    if (!currentUser || !currentUser.id) return;

    cashBalanceApi.getCashBalance(currentUser.id)
      .then((balance) => {
        setCurrentCashBalance(balance);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error loading cash balance:', error);
        setCurrentCashBalance(1000.00); // Default fallback
        setLoading(false);
      });
  }, [currentUser]);

  useEffect(() => {
    firebaseApi.get(`/portfolios/${currentUser.username}.json`)
      .then((res) => {
        const total = [];
        for (let stock in res.data) {
          total.push({ ...res.data[stock], firebaseID: stock });
        }
        setPortfolioValue(total);
        // console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, [currentUser.username]);

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
  }, [currentUser.username]);

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

  const history = useHistory();
  const routeChangeAccountStocksPage = (ticker) => {
    let path = ticker;
    history.push(path);
  };

  const predictiveSearch = (item) => {
    setSearchValue(item.symbol);
    accountSearch();
    setSearchValue("");
  };


  const handleAmountChange = (event) => {
    setTransferAmount(event.target.value);
  }

  const handleTransfer = async (event) => {
    event.preventDefault();
    
    if (!currentUser || !currentUser.id) return;
    if (!transferAmount || parseFloat(transferAmount) <= 0) {
      setTransferStatus("Please enter a valid amount");
      return;
    }

    const amount = parseFloat(transferAmount);
    setTransferStatus("Processing transfer...");

    try {
      if (fromAccountState === "Cathay Bank" && toAccountState === "Roberthood") {
        // Deposit money into Roberthood
        const newBalance = await cashBalanceApi.addCash(amount, currentUser.id);
        setCurrentCashBalance(newBalance);
        setTransferStatus(`Successfully deposited $${amount.toFixed(2)}. New balance: $${newBalance.toFixed(2)}`);
      } else if (fromAccountState === "Roberthood" && toAccountState === "Cathay Bank") {
        // Withdraw money from Roberthood
        const newBalance = await cashBalanceApi.subtractCash(amount, currentUser.id);
        setCurrentCashBalance(newBalance);
        setTransferStatus(`Successfully withdrew $${amount.toFixed(2)}. New balance: $${newBalance.toFixed(2)}`);
      } else {
        setTransferStatus("Invalid transfer direction");
        return;
      }

      setTransferAmount("");
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        setTransferStatus("");
      }, 5000);

    } catch (error) {
      console.error('Transfer error:', error);
      if (error.message === 'Insufficient funds') {
        setTransferStatus(`Transfer failed: Insufficient funds. Current balance: $${currentCashBalance.toFixed(2)}`);
      } else {
        setTransferStatus(`Transfer failed: ${error.message}`);
      }
    }
  } 

  return (
    <div>
      <div className="header">
        <div className="navbar-left">
          <div>
            <Link to="/portfolio">
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
                    <div>Ben Hsieh</div>
                    <hr className="horizontal-bar" />
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
      <br />
      <br />
      <div>
        <div className="user-account">
          <h1>
            {currentUser.first_name} {currentUser.last_name}
          </h1>
          <nav className="user-nav-bar">
            <NavLink to="/account" className="account-page-link" activeClassName="active" exact>
              Account
            </NavLink>
            <NavLink to="/account/banking" className="account-page-link" activeClassName="active" exact>
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
        <br />
        <br />
        
        {/* Current Cash Balance Display */}
        <div className="cash-balance-display">
          <h2>Current Roberthood Cash Balance</h2>
          <h3 className="balance-amount">
            {loading ? "Loading..." : `$${currentCashBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
          </h3>
        </div>
        
        <br />
        <br />
        <br />
        <form className="banking-page-transfer-form">
          <h3>Transfer</h3>
          <hr />
          
          {/* Transfer Status */}
          {transferStatus && (
            <div className={`transfer-status ${transferStatus.includes('failed') || transferStatus.includes('Invalid') || transferStatus.includes('Please') ? 'error' : 'success'}`}>
              {transferStatus}
            </div>
          )}
          
          <div className="banking-page-input-fields">
            <label htmlFor="from">
              From
              {toAccountState === "Roberthood" ? (
                <select
                  id="from"
                  name="from"
                  className="banking-page-input"
                  onChange={(e) => {
                    const selectedFromAccount = e.target.value;
                    setFromAccountState(selectedFromAccount);
                  }}
                >
                  <option value="Cathay Bank">Cathay Bank</option>
                  <option value="Roberthood">Roberthood</option>
                </select>
              ) : (
                <select
                  id="from"
                  name="from"
                  className="banking-page-input"
                  onChange={(e) => {
                    const selectedFromAccount = e.target.value;
                    setFromAccountState(selectedFromAccount);
                  }}
                >
                  <option value="Roberthood">Roberthood</option>
                  <option value="Cathay Bank">Cathay Bank</option>
                </select>
              )}
            </label>
            <br />
            <label htmlFor="to">
              To
              {fromAccountState === "Cathay Bank" ? (
                <select
                  id="to"
                  name="to"
                  className="banking-page-input"
                  onChange={(e) => {
                    const selectedToAccount = e.target.value;
                    setToAccountState(selectedToAccount);
                  }}
                >
                  <option value="Roberthood">Roberthood</option>
                  <option value="Cathay Bank">Cathay Bank</option>
                </select>
              ) : (
                <select
                  id="to"
                  name="to"
                  className="banking-page-input"
                  onChange={(e) => {
                    const selectedToAccount = e.target.value;
                    setToAccountState(selectedToAccount);
                  }}
                >
                  <option value="Cathay Bank">Cathay Bank</option>
                  <option value="Roberthood">Roberthood</option>
                </select>
              )}
            </label>
            <br />
            <label>
              Amount
              <input
                type="number"
                className="banking-page-amount"
                placeholder="0.00"
                value={transferAmount}
                onChange={handleAmountChange}
                min="0"
                step="0.01"
              />
            </label>
          </div>
          <br />
          <br />
          <button className="banking-page-btn" onClick={handleTransfer} disabled={loading}>
            {loading ? "Loading..." : "Submit Transfer"}
          </button>
        </form>
      </div>
    </div>
  );
};
