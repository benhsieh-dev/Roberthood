(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./frontend/components/dashboard/dashboard.jsx":
/*!*****************************************************!*\
  !*** ./frontend/components/dashboard/dashboard.jsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! recharts */ "./node_modules/recharts/es6/index.js");
/* harmony import */ var _axios_quotes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../axios-quotes */ "./frontend/components/axios-quotes.js");
/* harmony import */ var _public_tickers_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../public/tickers.js */ "./public/tickers.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }






// Import the image asset
const roberthoodHatURL = '/assets/roberthood_hat.png';
/* harmony default export */ __webpack_exports__["default"] = (_ref => {
  let currentUser = _ref.currentUser,
    logout = _ref.logout;
  const _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
    _useState2 = _slicedToArray(_useState, 2),
    searchValue = _useState2[0],
    setSearchValue = _useState2[1];
  const _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
    _useState4 = _slicedToArray(_useState3, 2),
    quote = _useState4[0],
    setQuote = _useState4[1];
  const _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
    _useState6 = _slicedToArray(_useState5, 2),
    chartData = _useState6[0],
    setChartData = _useState6[1];
  const _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
    _useState8 = _slicedToArray(_useState7, 2),
    news = _useState8[0],
    setNews = _useState8[1];
  const _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
    _useState10 = _slicedToArray(_useState9, 2),
    show = _useState10[0],
    setShow = _useState10[1];
  const _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
    _useState12 = _slicedToArray(_useState11, 2),
    portfolioValue = _useState12[0],
    setPortfolioValue = _useState12[1];
  const _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
    _useState14 = _slicedToArray(_useState13, 2),
    stock = _useState14[0],
    setStock = _useState14[1];
  const _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0),
    _useState16 = _slicedToArray(_useState15, 2),
    shares = _useState16[0],
    setShares = _useState16[1];
  const _useState17 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null),
    _useState18 = _slicedToArray(_useState17, 2),
    sharesError = _useState18[0],
    setSharesError = _useState18[1];

  // Track if component is mounted to prevent memory leaks
  const isMountedRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(true);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    document.title = 'Portfolio | Roberthood';

    // Cleanup function to prevent memory leaks
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    let isMounted = true; // Track if the component is still mounted

    if (news.length < 1) {
      $.ajax("/api/news/new").done(res => {
        if (isMounted) {
          // Only update state if the component is still mounted
          setNews(prevNews => prevNews.concat(res.articles));
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - only run once on mount

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    let isMounted = true;

    // Load default 'qqq' quote data on mount
    $.ajax(`/api/stocks/chart/qqq`).done(res => {
      if (isMounted) setChartData(res);
    });
    $.ajax(`/api/stocks/quote/qqq`).done(res => {
      if (isMounted) {
        // API returns an array, get the first element and map to expected format
        const data = Array.isArray(res) ? res[0] : res;
        const mappedQuote = _objectSpread(_objectSpread({}, data), {}, {
          company_name: data.name,
          latest_price: data.price,
          change_percent_s: `${data.changesPercentage ? data.changesPercentage.toFixed(2) : '0.00'}%`
        });
        setQuote(mappedQuote);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - only run once on mount

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    let isMounted = true;
    Object(_axios_quotes__WEBPACK_IMPORTED_MODULE_3__["default"])({
      method: "GET",
      url: `https://roberthood-edcdd.firebaseio.com/portfolios/${currentUser.username}.json`
    }).then(res => {
      if (isMounted && res.data) {
        const total = [];
        // fetches portfolio information from firebase 
        for (let stock in res.data) {
          total.push(_objectSpread(_objectSpread({}, res.data[stock]), {}, {
            firebaseID: stock
          }));
        }
        setPortfolioValue(total);
      }
    }).catch(error => console.log(error));
    return () => {
      isMounted = false;
    };
  }, []); // should change when portfolio changes

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    let isMounted = true;
    Object(_axios_quotes__WEBPACK_IMPORTED_MODULE_3__["default"])({
      method: 'GET',
      url: `https://roberthood-edcdd.firebaseio.com/${currentUser.username}.json`
    }).then(res => {
      // console.log(res); 
      if (isMounted && res.data) {
        const watchlist = [];
        for (let stock in res.data) {
          watchlist.push(_objectSpread(_objectSpread({}, res.data[stock]), {}, {
            firebaseID: stock
          }));
        }
        setStock(watchlist);
      }
    }).catch(error => console.log(error));
    return () => {
      isMounted = false;
    };
  }, []); // should change when watchlist changes

  const dashboardSearch = () => {
    $.ajax(`/api/stocks/quote/${searchValue}`).done(res => {
      if (!isMountedRef.current) return; // Prevent state update on unmounted component

      console.log(res);
      // API returns an array, get the first element and map to expected format
      const data = Array.isArray(res) ? res[0] : res;
      const mappedQuote = _objectSpread(_objectSpread({}, data), {}, {
        company_name: data.name,
        latest_price: data.price,
        change_percent_s: `${data.changesPercentage ? data.changesPercentage.toFixed(2) : '0.00'}%`
      });
      setQuote(mappedQuote);
    }).fail(() => {
      if (!isMountedRef.current) return;
      console.error('Failed to fetch quote data');
    });
    $.ajax(`/api/stocks/chart/${searchValue}`).done(res => {
      if (!isMountedRef.current) return; // Prevent state update on unmounted component
      setChartData(res);
    }).fail(() => {
      if (!isMountedRef.current) return;
      console.error('Failed to fetch chart data');
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
    if (event.key === 'Enter') {
      dashboardSearch();
    }
  };
  const operation = () => {
    setShow(!show);
  };
  const postDataHandler = () => {
    _axios_quotes__WEBPACK_IMPORTED_MODULE_3__["default"].post(`./${currentUser.username}.json`, quote).then(document.querySelector('.watchlist_btn').textContent = "Added to Watchlist").catch(error => console.log(error));
  };
  const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"])();
  const routeChange = () => {
    let path = `/account`;
    history.push(path);
  };
  const routeChangeDashboardStocksPage = ticker => {
    let path = ticker;
    history.push(path);
  };
  const watchlistChecker = () => {
    if (!quote.symbol) return null;
    for (let watchlistItem of stock) {
      if (watchlistItem.symbol === quote.symbol) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          className: "watchlist_btn",
          onClick: deleteWatchlistItemHandler(watchlistItem)
        }, "- Remove from Lists");
      }
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "watchlist_btn",
      onClick: postDataHandler
    }, "+ Add to Lists");
  };
  const deleteWatchlistItemHandler = watchlistItem => {
    return event => {
      event.preventDefault();
      _axios_quotes__WEBPACK_IMPORTED_MODULE_3__["default"].delete(`./${currentUser.username}/${watchlistItem.firebaseID}.json`).catch(error => console.log(error));
    };
  };
  const predictiveSearch = item => {
    setSearchValue(item.symbol);
    dashboardSearch();
    setSearchValue("");
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "navbar-left"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/dashboard"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: "dashboard-roberthood-hat",
    src: roberthoodHatURL
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dashboard-search-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "search-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: dashboardSearch,
    className: "search-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "fas fa-search"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "search-txt",
    type: "text",
    name: "",
    placeholder: "Search",
    onChange: event => {
      handleOnChange(event);
    }
    //  value={searchValue}
    ,
    onKeyPress: handleKeyPress,
    alt: "search"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dashboard-search-suggestions"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, _public_tickers_js__WEBPACK_IMPORTED_MODULE_4__["TickerSymbols"].map(name => {
    {
      /* if (searchValue.length !== 0 && searchValue !== "qqq") { */
    }
    if (searchValue.length !== 0) {
      if (name.symbol.toLowerCase().startsWith(searchValue.toLowerCase())) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: name.symbol,
          onClick: () => predictiveSearch(name)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
          style: {
            paddingRight: "3rem"
          }
        }, name.symbol), name.name);
      } else {
        return null;
      }
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
    className: "nav-bar"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://angel.co/u/ben-hsieh-6",
    target: "_blank"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "nav-menu-item"
  }, "AngelList")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://github.com/benhsieh-dev",
    target: "_blank"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "nav-menu-item"
  }, "GitHub")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://www.linkedin.com/in/ben-hsieh-05522542/",
    target: "_blank"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "nav-menu-item"
  }, "Linkedin"), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/signup"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "nav-menu-item"
  }, "Portfolio")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropdown"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "nav-menu-item dropdown",
    onClick: operation
  }, "Account"), show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "dropdown-menu"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "user-information"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, currentUser.first_name, " ", currentUser.last_name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropdown-portfolio-value"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "$", portfolioValue.map(a => a.Total).reduce((a, b) => a + b, 0).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Portfolio Value"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "dropdown-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "fab fa-angellist menu-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://angel.co/u/ben-hsieh-6",
    target: "_blank"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "dropdown-menu-item"
  }, "AngelList"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "dropdown-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "fab fa-github menu-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://github.com/benhsieh-dev",
    target: "_blank"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "dropdown-menu-item"
  }, "GitHub"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "dropdown-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "fab fa-linkedin-in menu-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://www.linkedin.com/in/ben-hsieh-05522542/",
    target: "_blank"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "dropdown-menu-item"
  }, "Linkedin"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "dropdown-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "fas fa-briefcase menu-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/account"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "dropdown-menu-item"
  }, "Account"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "dropdown-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "fas fa-university menu-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/account/banking"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "dropdown-menu-item"
  }, "Banking"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "dropdown-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "fas fa-sign-out-alt menu-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "dropdown-menu-item logout",
    onClick: logout
  }, "Log Out"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "left"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "Quote"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "ticker-results"
  }, quote && quote.company_name ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, quote.company_name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Ticker:"), " ", quote.symbol), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Latest Price:"), "$", JSON.stringify(quote.latest_price)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, "$", JSON.stringify(quote.change), "(", quote.change_percent_s, ")", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "today"
  }, "Today ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "YTD change:"), " ", (quote.ytd_change * 100).toFixed(2), "%")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, "Loading...")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "Chart"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["LineChart"], {
    width: 800,
    height: 400,
    data: chartData
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["CartesianGrid"], {
    strokeDasharray: "3 3"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["XAxis"], {
    dataKey: "minute"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["YAxis"], {
    type: "number",
    domain: ["auto", "auto"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["Line"], {
    type: "monotone",
    dataKey: "close",
    stroke: "#8884d8"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "news-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "News")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "news"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, news.map((item, idx) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: idx,
      className: "news-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-bolt"
    }), "\u00A0", "\u00A0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, item.source.name), "\u00A0", "\u00A0", item.publishedAt), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "news-title"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "news-title-header",
      href: item.url,
      target: "_blank"
    }, item.title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      className: "news-image",
      src: item.urlToImage
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null));
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "footer"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dashboard-right"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "watchlist-header"
  }, "Watchlist"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, stock.map((item, idx) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    key: idx,
    className: "watchlist"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "watchlist_item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, item.symbol), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, item.latest_price), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, item.change_percent_s)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "remove_from_watchlist",
    onClick: deleteWatchlistItemHandler(item)
  }, "Remove from Watchlist"))))))));
});

/***/ }),

/***/ "./frontend/components/dashboard/dashboard_container.jsx":
/*!***************************************************************!*\
  !*** ./frontend/components/dashboard/dashboard_container.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _dashboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard */ "./frontend/components/dashboard/dashboard.jsx");
/* harmony import */ var _actions_session__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/session */ "./frontend/actions/session.js");




const msp = state => ({
  currentUser: state.session.currentUser
});
const mdp = dispatch => ({
  logout: () => dispatch(Object(_actions_session__WEBPACK_IMPORTED_MODULE_3__["logout"])())
});
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(msp, mdp)(_dashboard__WEBPACK_IMPORTED_MODULE_2__["default"]));

/***/ })

}]);
//# sourceMappingURL=6.bundle.js.map