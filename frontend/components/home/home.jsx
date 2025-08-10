import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'; 



export default () => {

const [show, setShow] = useState(false);

const operation = () => {
  setShow(!show);
};

useEffect(() => {
  document.title = 'Commission-free Stock Trading & Investing App | Roberthood'
})

  return (
    <div>
      <nav className="landing-page-nav-bar">
        <div className="navbar-container-1">
          <div className="landing-page-logo">
            <h3 className="roberthood">Roberthood</h3>
            <Link to="/">
              <img className="roberthood-hat" src={roberthoodHatURL} />
            </Link>
          </div>

          <div className="landing-page-menu-items">
            <a href="https://angel.co/u/ben-hsieh-6">
              <span className="landing-page-menu-item">AngelList</span>
            </a>
            <a href="https://github.com/benhsieh-dev">
              <span className="landing-page-menu-item">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/ben-hsieh-05522542/">
              <span className="landing-page-menu-item">Linkedin</span>
            </a>
          </div>
        </div>

        <div className="navbar-container-2">
          <div>
            <Link className="nav-bar-signin" to="/login">
              <button className="signin-btn">Sign In</button>
            </Link>
          </div>
          <div>
            <Link className="nav-bar-signup" to="/signup">
              <button className="splash-signup-btn">Sign Up</button>
            </Link>
          </div>
        </div>
        {/* responsive web design   
        <div className="menu-btn">
          <div className="menu-btn_burger"></div>
        </div>
        */}
        <div className="menu-btn">
          <i className="fas fa-bars fa-2x" onClick={operation}></i>
          {show && (
            <ul className="burger-menu-dropdown">
              <li>
                <Link to="/login">
                  <h4 className="burger-menu-items">Sign In</h4>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <h4 className="burger-menu-items">Sign Up</h4>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>

      <div className="container-1">
        <div className="content-1">
          <div>
            <h1 className="signup-message">Investing for Everyone</h1>
            <p className="paragraph-1">
              Roberthood, a pioneer of commission-free investing, gives you more
              ways to make your money work harder.
            </p>
            <Link to="/signup">
              <button className="content-signup-btn">Sign Up</button>
            </Link>
          </div>
          <div className="cash-management">
            <img className="cash-management-photo" src={cashManagementURL} />
          </div>
        </div>
      </div>

      <div className="container-2">
        <br />
        <br />
        <br />
        <div className="content-2">
          <div className="content-2-full">
            <h2 className="content-2-header">
              Break Free from Commission Fees
            </h2>
            <p className="content-2-body">
              Make unlimited commission-free trades in stocks, ETFs, and options
              with Robinhood Financial, as well as buy and sell cryptocurrencies
              with Robinhood Crypto.{" "}
              {/* See our {" "}
              <u>
                <strong>fee schedule </strong>
              </u>
              to learn more about cost. */}
            </p>
          </div>
          <div className="content-2-footer">
            {/*<i className="fas fa-info-circle"></i>
            <p> Commissions Disclosure</p> */}
          </div>
        </div>
      </div>

      <div className="container-3">
        <div className="container-3-full">
          <div className="container-3-left">
            <div className="content-3">
              <div className="content-3-box1">
                <h2 className="content-3-header">
                  Introducing Fractional Shares
                </h2>
                <p>Invest in thousands of stocks with as little as $1.</p>
              </div>

              <div className="content-3-box2">
                <div className="content-3-box2A">
                  <h3>Invest Any Amount</h3>
                  <p>
                    Choose how much you want to invest, and we’ll convert from
                    dollars to parts of a whole share.
                  </p>
                </div>
                <div className="content-3-box2B">
                  <h3>Build a Balanced Portfolio</h3>
                  <p>
                    Customize your portfolio with pieces of different companies
                    and funds to help reduce risk.
                  </p>
                </div>
                <div className="content-3-box2C">
                  <h3>Trade in Real Time</h3>
                  <p>
                    Trades placed during market hours are executed at that time,
                    so you’ll always know the share price.
                  </p>
                </div>
              </div>

              <div className="content-3-search">
                {/* <button>Get Early Access</button> */}
              </div>
            </div>
          </div>

          <div className="container-3-right">
            <img
              className="abstract_image"
              src={abstractURL}
              alt="abstract image"
            />
          </div>
        </div>
      </div>

      <div className="container-4">
        {/* div className="content-4"> 
             <div className="content-4-box1">
            <ul>
              <li>
                <span className="learn">Learn</span>
              </li>
              <li>
                <span className="manage">Manage</span>
              </li>
              <li>
                <span className="customize" to="#">
                  Customize
                </span>
              </li>
            </ul>
          </div>
          <div>
            <img className="learn-image" src={learnAsYouGrowURL} />
          </div>
          */}
        <div className="social-media">
          <a
            className="sm-icon"
            href="https://angel.co/u/ben-hsieh-6"
            target="_blank"
          >
            <i className="fab fa-angellist fa-5x"></i>
          </a>
          <a
            className="sm-icon"
            href="https://github.com/benhsieh-dev"
            target="_blank"
          >
            {/* <i class="fab fa-facebook-f fa-5x"></i> */}
            <i className="fab fa-github fa-5x"></i>
          </a>
          <a
            className="sm-icon"
            href="https://www.linkedin.com/in/ben-hsieh-05522542/"
            target="_blank"
          >
            <i className="fab fa-linkedin-in fa-5x"></i>
          </a>
        </div>

        {/* </div> */}
      </div>
    </div>
  );
}


  // <div className="container-5">
  //     <img className="our-products-image" src={ourProductsURL} />
  //   </div>

  //   <div className="container-6">
  //     <img className="landing-page-footer" src={landingPageFooterURL} />
  //   </div>
