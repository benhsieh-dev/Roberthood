(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./frontend/components/stocks/stocks.jsx":
/*!***********************************************!*\
  !*** ./frontend/components/stocks/stocks.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! recharts */ "./node_modules/recharts/es6/index.js");
/* harmony import */ var react_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-tabs */ "./node_modules/react-tabs/esm/index.js");
/* harmony import */ var _axios_quotes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../axios-quotes */ "./frontend/components/axios-quotes.js");
/* harmony import */ var _public_tickers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../public/tickers */ "./public/tickers.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var currentUser = _ref.currentUser,
    logout = _ref.logout;
  var _useParams = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useParams"])(),
    ticker = _useParams.ticker;
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(ticker),
    _useState2 = _slicedToArray(_useState, 2),
    searchValue = _useState2[0],
    setSearchValue = _useState2[1];
  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(""),
    _useState4 = _slicedToArray(_useState3, 2),
    quote = _useState4[0],
    setQuote = _useState4[1];
  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
    _useState6 = _slicedToArray(_useState5, 2),
    chartData = _useState6[0],
    setChartData = _useState6[1];
  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
    _useState8 = _slicedToArray(_useState7, 2),
    news = _useState8[0],
    setNews = _useState8[1];
  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
    _useState10 = _slicedToArray(_useState9, 2),
    show = _useState10[0],
    setShow = _useState10[1];
  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
    _useState12 = _slicedToArray(_useState11, 2),
    portfolioValue = _useState12[0],
    setPortfolioValue = _useState12[1];
  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
    _useState14 = _slicedToArray(_useState13, 2),
    stock = _useState14[0],
    setStock = _useState14[1];
  var _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0),
    _useState16 = _slicedToArray(_useState15, 2),
    shares = _useState16[0],
    setShares = _useState16[1];
  var _useState17 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0),
    _useState18 = _slicedToArray(_useState17, 2),
    availableShares = _useState18[0],
    setAvailableShares = _useState18[1];
  var _useState19 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null),
    _useState20 = _slicedToArray(_useState19, 2),
    sharesError = _useState20[0],
    setSharesError = _useState20[1];
  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"])();
  var routeChange = function routeChange() {
    var path = "/account";
    history.push(path);
  };
  var routeChangeStocksPage = function routeChangeStocksPage(ticker) {
    var path = ticker;
    history.push(path);
  };
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    document.title = "".concat(ticker.toUpperCase(), " - $").concat(parseInt(quote.latest_price).toFixed(2), " | Roberthood");
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (news.length < 1) {
      stocksSearch();
      $.ajax("/api/news/new").done(function (res) {
        setNews(news.concat(res.articles));
      });
    }
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    Object(_axios_quotes__WEBPACK_IMPORTED_MODULE_4__["default"])({
      method: "GET",
      url: "https://roberthood-edcdd.firebaseio.com/portfolios/".concat(currentUser.username, ".json")
    }).then(function (res) {
      var total = [];
      for (var _stock in res.data) {
        total.push(_objectSpread(_objectSpread({}, res.data[_stock]), {}, {
          firebaseID: _stock
        }));
      }
      setPortfolioValue(total);
    })["catch"](function (error) {
      return console.log(error);
    });
  }, [portfolioValue]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    Object(_axios_quotes__WEBPACK_IMPORTED_MODULE_4__["default"])({
      method: "GET",
      url: "https://roberthood-edcdd.firebaseio.com/".concat(currentUser.username, ".json")
    }).then(function (res) {
      var watchlist = [];
      for (var _stock2 in res.data) {
        watchlist.push(_objectSpread(_objectSpread({}, res.data[_stock2]), {}, {
          firebaseID: _stock2
        }));
      }
      setStock(watchlist);
    })["catch"](function (error) {
      return console.log(error);
    });
  });
  var stocksSearch = function stocksSearch() {
    $.ajax("/api/stocks/quote/".concat(searchValue)).done(function (res) {
      setQuote(res);
    });
    $.ajax("/api/stocks/chart/".concat(searchValue)).done(function (res) {
      setChartData(res);
    });
    routeChangeStocksPage("/stocks/".concat(searchValue));
  };
  var handleOnChange = function handleOnChange(event) {
    setSearchValue(event.target.value);
  };
  var handleKeyPress = function handleKeyPress(event) {
    if (event.key === "Enter") {
      stocksSearch();
    }
  };
  var operation = function operation() {
    setShow(!show);
  };
  var postDataHandler = function postDataHandler() {
    _axios_quotes__WEBPACK_IMPORTED_MODULE_4__["default"].post("./".concat(currentUser.username, ".json"), quote).then(document.querySelector(".watchlist_btn").textContent = "Added to Watchlist")["catch"](function (error) {
      return console.log(error);
    });
  };
  var buyStockHandler = function buyStockHandler() {
    var total = shares * quote.latest_price;
    var _iterator = _createForOfIteratorHelper(portfolioValue),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _stock3 = _step.value;
        if (_stock3.Company.symbol === quote.symbol) {
          _axios_quotes__WEBPACK_IMPORTED_MODULE_4__["default"].patch("./portfolios/".concat(currentUser.username, "/").concat(_stock3.firebaseID, ".json"), {
            Quantity: parseInt(_stock3.Quantity) + parseInt(shares)
          }).then(document.querySelector(".buy-stock").textContent = "Bought").then(document.querySelector(".buy-stock").disabled = true);
          return;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (shares >= 1) {
      _axios_quotes__WEBPACK_IMPORTED_MODULE_4__["default"].post("./portfolios/".concat(currentUser.username, ".json"), {
        Company: quote,
        Quantity: shares,
        Total: total
      }).then(document.querySelector(".buy-stock").textContent = "Bought").then(setSharesError(null)).then(document.querySelector(".buy-stock").disabled = true)["catch"](function (error) {
        return console.log(error);
      });
    } else {
      setSharesError("Please enter valid number of shares.");
    }
  };
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    checkAvailableShares();
  });
  var checkAvailableShares = function checkAvailableShares() {
    portfolioValue.forEach(function (stock) {
      if (stock.Company.symbol === quote.symbol) setAvailableShares(stock.Quantity);
    });
  };
  var sellStockHandler = function sellStockHandler() {
    var total = shares * quote.latest_price;
    var _iterator2 = _createForOfIteratorHelper(portfolioValue),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _stock4 = _step2.value;
        if (_stock4.Company.symbol === quote.symbol && shares <= _stock4.Quantity) {
          _axios_quotes__WEBPACK_IMPORTED_MODULE_4__["default"].patch("./portfolios/".concat(currentUser.username, "/").concat(_stock4.firebaseID, ".json"), {
            Quantity: parseInt(_stock4.Quantity) - parseInt(shares)
          }).then(document.querySelector(".stocks-sell-stock").textContent = "Sold").then(document.querySelector(".stocks-sell-stock").disabled = true).then(routeChange());
          return;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  };
  var watchlistChecker = function watchlistChecker() {
    var _iterator3 = _createForOfIteratorHelper(stock),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var watchlistItem = _step3.value;
        if (watchlistItem.symbol === quote.symbol) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
            className: "watchlist_btn",
            onClick: deleteWatchlistItemHandler(watchlistItem)
          }, "Remove from Watchlist");
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "watchlist_btn",
      onClick: postDataHandler
    }, "+ Add to Lists");
  };
  var deleteWatchlistItemHandler = function deleteWatchlistItemHandler(watchlistItem) {
    return function (event) {
      event.preventDefault();
      _axios_quotes__WEBPACK_IMPORTED_MODULE_4__["default"]["delete"]("./".concat(currentUser.username, "/").concat(watchlistItem.firebaseID, ".json"))["catch"](function (error) {
        return console.log(error);
      });
    };
  };
  var sellAllHandler = function sellAllHandler(stock) {
    return function (event) {
      event.preventDefault();
      _axios_quotes__WEBPACK_IMPORTED_MODULE_4__["default"]["delete"]("./portfolios/".concat(currentUser.username, "/").concat(stock.firebaseID, ".json")).then(routeChange())["catch"](function (error) {
        return console.log(error);
      });
    };
  };
  var stocksPredictiveSearch = function stocksPredictiveSearch(item) {
    setSearchValue(item.symbol);
    stocksSearch();
    setSearchValue("");
  };
  var sellAllStocksHandler = function sellAllStocksHandler() {
    var _iterator4 = _createForOfIteratorHelper(portfolioValue),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _stock5 = _step4.value;
        console.log(_stock5.Company.symbol);
        if (_stock5.Company.symbol === quote.symbol) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
            className: "sell-all-shares-btn",
            onClick: sellAllHandler(_stock5)
          }, "Sell All");
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
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
    className: "predictive-search"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "search-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: stocksSearch,
    className: "search-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "fas fa-search"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "search-txt",
    type: "text",
    name: "",
    placeholder: "Search",
    onChange: function onChange(event) {
      handleOnChange(event);
    },
    value: searchValue,
    onKeyPress: handleKeyPress,
    alt: "search"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "auto-suggestions"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, _public_tickers__WEBPACK_IMPORTED_MODULE_5__["TickerSymbols"].map(function (name) {
    if (searchValue.length !== 0) {
      if (name.symbol.toLowerCase().startsWith(searchValue.toLowerCase())) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: name.symbol,
          onClick: function onClick() {
            return stocksPredictiveSearch(name);
          }
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
    to: "/dashboard"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "nav-menu-item"
  }, "Portfolio")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropdown"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "nav-menu-item dropdown",
    onClick: operation
  }, "Account"), show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "dropdown-menu"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Ben Hsieh"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
    className: "horizontal-bar"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "dropdown-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    "class": "fab fa-angellist menu-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://angel.co/u/ben-hsieh-6",
    target: "_blank"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "dropdown-menu-item"
  }, "AngelList"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "dropdown-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    "class": "fab fa-github menu-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://github.com/benhsieh-dev",
    target: "_blank"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "dropdown-menu-item"
  }, "GitHub"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "dropdown-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    "class": "fab fa-linkedin-in menu-icon"
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
    className: "fas fa-sign-out-alt menu-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "dropdown-menu-item logout",
    onClick: logout
  }, "Log Out"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "stocks-page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "stocks-left"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, quote.company_name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "$", JSON.stringify(quote.latest_price), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "$", JSON.stringify(quote.change), "(", JSON.stringify(quote.change_percent_s), ") Today")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
    className: "news"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, news.map(function (item, idx) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: idx,
      className: "news-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fas fa-bolt"
    }), "\xA0", "\xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, item.source.name), "\xA0", "\xA0", item.publishedAt), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "news-title"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "news-title-header",
      href: item.url,
      target: "_blank"
    }, item.title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      className: "news-image",
      src: item.urlToImage
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null));
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "stocks-right"
  }, availableShares === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "stocks-trade"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Buy ", quote.symbol), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "account-stock-purchase"
  }, "Shares", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    value: shares,
    className: "account-purchase-shares",
    type: "number",
    min: "0",
    step: "1",
    onChange: function onChange(e) {
      return setShares(e.target.value);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Market Price:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "market-price"
  }, "$", parseInt(quote.latest_price).toFixed(2)), console.log(_typeof(quote.latest_price)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "buy-stock",
    onClick: buyStockHandler
  }, "Buy"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "available-shares"
  }, availableShares, " ", availableShares <= 1 ? "Share" : "Shares", " Available", "\xa0", sellAllStocksHandler()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "account-purchase-shares-error"
  }, sharesError), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), watchlistChecker()) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs__WEBPACK_IMPORTED_MODULE_3__["Tabs"], {
    defaultIndex: 1
    // onSelect={(index) => console.log(index)}
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs__WEBPACK_IMPORTED_MODULE_3__["TabList"], {
    className: "tabs-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs__WEBPACK_IMPORTED_MODULE_3__["Tab"], {
    className: "buy-stock-tab"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Buy ", quote.symbol)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs__WEBPACK_IMPORTED_MODULE_3__["Tab"], {
    className: "sell-stock-tab"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Sell ", quote.symbol))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs__WEBPACK_IMPORTED_MODULE_3__["TabPanel"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "stocks-trade"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "account-stock-purchase"
  }, "Shares", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    value: shares,
    className: "account-purchase-shares",
    type: "number",
    min: "0",
    step: "1",
    onChange: function onChange(e) {
      return setShares(e.target.value);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Market Price:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "market-price"
  }, "$", quote.latest_price), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "buy-stock",
    onClick: buyStockHandler
  }, "Buy"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "account-purchase-shares-error"
  }, sharesError), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), watchlistChecker())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tabs__WEBPACK_IMPORTED_MODULE_3__["TabPanel"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "stocks-trade"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "account-stock-purchase"
  }, "Shares", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    value: shares,
    className: "account-purchase-shares",
    type: "number",
    min: "0",
    step: "1",
    onChange: function onChange(e) {
      return setShares(e.target.value);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Market Price:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "market-price"
  }, "$", quote.latest_price), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "stocks-sell-stock",
    onClick: sellStockHandler
  }, "Sell"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "available-shares"
  }, availableShares, " ", availableShares <= 1 ? "Share" : "Shares", " Available - ", "\xa0", sellAllStocksHandler()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "account-purchase-shares-error"
  }, sharesError), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), watchlistChecker()))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null))));
});

/***/ }),

/***/ "./frontend/components/stocks/stocks_container.jsx":
/*!*********************************************************!*\
  !*** ./frontend/components/stocks/stocks_container.jsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _stocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stocks */ "./frontend/components/stocks/stocks.jsx");
/* harmony import */ var _actions_session_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/session.js */ "./frontend/actions/session.js");




var msp = function msp(state) {
  return {
    currentUser: state.session.currentUser
  };
};
var mdp = function mdp(dispatch) {
  return {
    logout: function logout() {
      return dispatch(Object(_actions_session_js__WEBPACK_IMPORTED_MODULE_3__["logout"])());
    }
  };
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(msp, mdp)(_stocks__WEBPACK_IMPORTED_MODULE_2__["default"]));

/***/ })

}]);
//# sourceMappingURL=9.bundle.js.map