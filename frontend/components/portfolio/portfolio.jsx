import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfolioApi, cashBalanceApi } from '../../utils/firebaseApi';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const roberthoodHatURL = '/assets/roberthood_hat.png';

export default ({ currentUser, logout }) => {
  const [portfolioValue, setPortfolioValue] = useState([]);
  const [cashBalance, setCashBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAccount, setShowAccount] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);

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

  // Data for Cash vs Stocks pie chart
  const assetAllocationData = [
    {
      name: 'Cash',
      value: cashBalance,
      percentage: totalAccountValue > 0 ? ((cashBalance / totalAccountValue) * 100).toFixed(2) : 0
    },
    {
      name: 'Stocks',
      value: totalPortfolioValue,
      percentage: totalAccountValue > 0 ? ((totalPortfolioValue / totalAccountValue) * 100).toFixed(2) : 0
    }
  ];

  // Data for individual stock holdings pie chart
  const stockHoldingsData = portfolioValue.map(stock => ({
    name: stock.Company?.symbol || 'Unknown',
    value: stock.Total || 0,
    percentage: totalPortfolioValue > 0 ? ((stock.Total / totalPortfolioValue) * 100).toFixed(2) : 0,
    company: stock.Company?.company_name || 'Unknown Company'
  }));

  // Colors for the charts
  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#8884D8', '#82CA9D', '#FFC658'];

  const toggleAccountDropdown = () => {
    setShowAccount(!showAccount);
    setShowPortfolio(false); // Close portfolio dropdown
  };

  const togglePortfolioDropdown = () => {
    setShowPortfolio(!showPortfolio);
    setShowAccount(false); // Close account dropdown
  };

  const closeDropdowns = () => {
    setShowAccount(false);
    setShowPortfolio(false);
  };

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
            <div className="dropdown">
              <button className="nav-menu-item dropdown active" onClick={togglePortfolioDropdown}>
                Portfolio
              </button>
              {showPortfolio && (
                <ul className="dropdown-menu">
                  <li className="dropdown-list">
                    <i className="fas fa-chart-line menu-icon"></i>
                    <Link to="/portfolio" onClick={closeDropdowns}>
                      <span className="dropdown-menu-item">Portfolio</span>
                    </Link>
                  </li>
                  <li className="dropdown-list">
                    <i className="fas fa-eye menu-icon"></i>
                    <Link to="/dashboard" onClick={closeDropdowns}>
                      <span className="dropdown-menu-item">Dashboard</span>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <div className="dropdown">
              <button className="nav-menu-item dropdown" onClick={toggleAccountDropdown}>
                Account
              </button>
              {showAccount && (
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
                    <Link to="/account" onClick={closeDropdowns}>
                      <span className="dropdown-menu-item">Account</span>
                    </Link>
                  </li>
                  <li className="dropdown-list">
                    <i className="fas fa-university menu-icon"></i>
                    <Link to="/account/banking" onClick={closeDropdowns}>
                      <span className="dropdown-menu-item">Banking</span>
                    </Link>
                  </li>
                  <li className="dropdown-list">
                    <i className="fas fa-sign-out-alt menu-icon"></i>
                    <span
                      className="dropdown-menu-item logout"
                      onClick={() => {
                        logout();
                        closeDropdowns();
                      }}
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
              <div className="label">Cash Balance:</div>
              <div className="amount">
                ${cashBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
            </div>
            <div className="balance-item">
              <div className="label">Stock Holdings:</div>
              <div className="amount">
                ${totalPortfolioValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Visualization Charts */}
        <div className="charts-section">
          <h2>Portfolio Breakdown</h2>
          
          <div className="charts-container">
            {/* Asset Allocation Chart */}
            <div className="chart-card">
              <h3>Asset Allocation</h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={assetAllocationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={(entry) => `${entry.name}: ${entry.percentage}%`}
                  >
                    {assetAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Stock Holdings Breakdown Chart */}
            {portfolioValue.length > 0 && (
              <div className="chart-card">
                <h3>Stock Holdings Distribution</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={stockHoldingsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={(entry) => `${entry.name}: ${entry.percentage}%`}
                    >
                      {stockHoldingsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                      labelFormatter={(label, payload) => {
                        const data = payload?.[0]?.payload;
                        return data ? `${data.company} (${label})` : label;
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
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