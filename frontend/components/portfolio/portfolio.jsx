import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfolioApi, cashBalanceApi } from '../../utils/firebaseApi';

const roberthoodHatURL = '/assets/roberthood_hat.png';

export default ({ currentUser, logout }) => {
  const [portfolioValue, setPortfolioValue] = useState([]);
  const [cashBalance, setCashBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Portfolio | Roberthood';
  }, []);

  useEffect(() => {
    if (!currentUser || !currentUser.id) return;

    const loadData = async () => {
      try {
        // Load both portfolio and cash balance in parallel
        const [portfolio, balance] = await Promise.all([
          portfolioApi.getPortfolio(currentUser.id),
          cashBalanceApi.getCashBalance(currentUser.id)
        ]);
        
        setPortfolioValue(portfolio);
        setCashBalance(balance);
        setLoading(false);
      } catch (error) {
        console.log('Error loading portfolio data:', error);
        // Set defaults on error
        setPortfolioValue([]);
        setCashBalance(1000.00);
        setLoading(false);
      }
    };

    loadData();
  }, [currentUser]);

  const totalPortfolioValue = portfolioValue
    .map((stock) => stock.Total || 0)
    .reduce((a, b) => a + b, 0);

  const totalAccountValue = totalPortfolioValue + cashBalance;

  if (loading) {
    return <div>Loading portfolio...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="header">
        <div className="navbar-left">
          <div>
            <Link to="/dashboard">
              <img
                className="dashboard-roberthood-hat"
                src={roberthoodHatURL}
                alt="Roberthood"
              />
            </Link>
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
              <span className="nav-menu-item">Linkedin</span>
            </a>
            <Link to="/dashboard">
              <span className="nav-menu-item">Dashboard</span>
            </Link>
            <Link to="/portfolio">
              <span className="nav-menu-item active">Portfolio</span>
            </Link>
            <div className="dropdown">
              <button className="nav-menu-item dropdown">
                Account
              </button>
              <div className="dropdown-menu">
                <Link to="/account">
                  <span className="dropdown-menu-item">Account</span>
                </Link>
                <Link to="/account/banking">
                  <span className="dropdown-menu-item">Banking</span>
                </Link>
                <span
                  className="dropdown-menu-item logout"
                  onClick={logout}
                >
                  Log Out
                </span>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="portfolio-container">
        <h1>Portfolio</h1>
        
        {/* Account Summary */}
        <div className="account-summary">
          <div className="balance-card">
            <h2>Total Account Value</h2>
            <h3 className="total-value">
              ${totalAccountValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h3>
          </div>

          <div className="balance-breakdown">
            <div className="balance-item">
              <span className="label">Cash Balance:</span>
              <span className="amount">
                ${cashBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </div>
            <div className="balance-item">
              <span className="label">Stock Holdings:</span>
              <span className="amount">
                ${totalPortfolioValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </div>
          </div>
        </div>

        {/* Stock Holdings */}


        <div className="holdings-section">
          <h2>Stock Holdings</h2>
          {portfolioValue.length > 0 ? (
            <div className="holdings-table">
              <div className="holdings-header">
                <div>Symbol</div>
                <div>Company</div>
                <div>Shares</div>
                <div>Price</div>
                <div>Total Value</div>
              </div>
              {portfolioValue.map((stock, index) => (
                <div key={index} className="holdings-row">
                  <div className="stock-symbol">
                    <Link to={`/stocks/${stock.Company?.symbol}`}>
                      {stock.Company?.symbol || 'N/A'}
                    </Link>
                  </div>
                  <div className="company-name">
                    {stock.Company?.company_name || 'Unknown Company'}
                  </div>
                  <div className="shares">
                    {stock.Quantity || 0}
                  </div>
                  <div className="price">
                    ${stock.Company?.latest_price?.toFixed(2) || '0.00'}
                  </div>
                  <div className="total-value">
                    ${stock.Total?.toFixed(2) || '0.00'}
                  </div>
                </div>
              ))}


              
            </div>
          ) : (
            <div className="no-holdings">
              <p>You don't have any stock holdings yet.</p>
              <p>
                <Link to="/dashboard">Start investing</Link> to build your portfolio.
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/account/banking" className="action-btn">
              Transfer Money
            </Link>
            <Link to="/dashboard" className="action-btn">
              Browse Stocks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};