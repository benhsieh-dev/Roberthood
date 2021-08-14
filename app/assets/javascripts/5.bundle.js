(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./frontend/components/banking/banking.jsx":
/*!*************************************************!*\
  !*** ./frontend/components/banking/banking.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _axios_quotes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../axios-quotes */ "./frontend/components/axios-quotes.js");
/* harmony import */ var _public_tickers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../public/tickers */ "./public/tickers.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var currentUser = _ref.currentUser,
      logout = _ref.logout;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(""),
      _useState2 = _slicedToArray(_useState, 2),
      searchValue = _useState2[0],
      setSearchValue = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(""),
      _useState4 = _slicedToArray(_useState3, 2),
      quote = _useState4[0],
      setQuote = _useState4[1]; // console.log("currentUser", currentUser);


  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState6 = _slicedToArray(_useState5, 2),
      show = _useState6[0],
      setShow = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState8 = _slicedToArray(_useState7, 2),
      portfolioValue = _useState8[0],
      setPortfolioValue = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState10 = _slicedToArray(_useState9, 2),
      stock = _useState10[0],
      setStock = _useState10[1];

  var ticker = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useParams"])();

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("Cathay Bank"),
      _useState12 = _slicedToArray(_useState11, 2),
      fromAccountState = _useState12[0],
      setFromAccountState = _useState12[1];

  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("Roberthood"),
      _useState14 = _slicedToArray(_useState13, 2),
      toAccountState = _useState14[0],
      setToAccountState = _useState14[1];

  var _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null),
      _useState16 = _slicedToArray(_useState15, 2),
      cashBalance = _useState16[0],
      setCashBalance = _useState16[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    document.title = "Account | Robinhood";
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    Object(_axios_quotes__WEBPACK_IMPORTED_MODULE_2__["default"])({
      method: "GET",
      url: "https://roberthood-edcdd.firebaseio.com/portfolios/".concat(currentUser.username, ".json")
    }).then(function (res) {
      var total = [];

      for (var _stock in res.data) {
        total.push(_objectSpread(_objectSpread({}, res.data[_stock]), {}, {
          firebaseID: _stock
        }));
      }

      setPortfolioValue(total); // console.log(res.data);
    })["catch"](function (error) {
      return console.log(error);
    });
  }, [portfolioValue]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    Object(_axios_quotes__WEBPACK_IMPORTED_MODULE_2__["default"])({
      method: "GET",
      url: "https://roberthood-edcdd.firebaseio.com/".concat(currentUser.username, ".json")
    }).then(function (res) {
      var watchlist = [];

      for (var _stock2 in res.data) {
        watchlist.push(_objectSpread(_objectSpread({}, res.data[_stock2]), {}, {
          firebaseID: _stock2
        }));
      }

      setStock(watchlist); // console.log(res.data);
    })["catch"](function (error) {
      return console.log(error);
    });
  });

  var accountSearch = function accountSearch() {
    $.ajax("/api/stocks/quote/".concat(searchValue)).done(function (res) {
      console.log(res);
      setQuote(res);
    });
    $.ajax("/api/stocks/chart/".concat(searchValue)).done(function (res) {
      // console.log(res);
      setChartData(res);
    });
    routeChangeAccountStocksPage("/stocks/".concat(searchValue));
  };

  var handleOnChange = function handleOnChange(event) {
    setSearchValue(event.target.value);
  };

  var handleKeyPress = function handleKeyPress(event) {
    if (event.key === "Enter") {
      accountSearch();
    }
  };

  var operation = function operation() {
    setShow(!show);
  };

  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"])();

  var routeChangeAccountStocksPage = function routeChangeAccountStocksPage(ticker) {
    var path = ticker;
    history.push(path);
  };

  var predictiveSearch = function predictiveSearch(item) {
    setSearchValue(item.symbol);
    accountSearch();
    setSearchValue("");
  };

  var getValue = function getValue(event) {
    setCashBalance(event.target.value); // console.log(`Event: ${event.target.value}`); 
    // console.log(`State: ${cashBalance}`); 
  };

  var cashBalanceHandler = function cashBalanceHandler(event) {
    event.preventDefault(); // const data = {
    //   Cash:cashBalance
    // }

    _axios_quotes__WEBPACK_IMPORTED_MODULE_2__["default"].patch("./portfolios/".concat(currentUser.username, "/Cash.json"), {
      cashBalance: cashBalance
    }).then(console.log("State: ".concat(cashBalance)));
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
    onClick: accountSearch,
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
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, _public_tickers__WEBPACK_IMPORTED_MODULE_3__["TickerSymbols"].map(function (name) {
    if (searchValue.length !== 0) {
      if (name.symbol.toLowerCase().startsWith(searchValue.toLowerCase())) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: name.symbol,
          onClick: function onClick() {
            return predictiveSearch(name);
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
    "class": "fas fa-university menu-icon"
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
  }, "Log Out"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "user-account"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, currentUser.first_name, " ", currentUser.last_name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
    className: "user-nav-bar"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/account",
    className: "banking-page-link"
  }, "Account"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/account/banking",
    className: "banking-page-link"
  }, "Banking"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://angel.co/u/ben-hsieh-6",
    className: "banking-page-link",
    target: "_blank"
  }, "Angel List"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://github.com/benhsieh-dev",
    className: "banking-page-link",
    target: "_blank"
  }, "GitHub"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://www.linkedin.com/in/ben-hsieh-05522542/",
    className: "banking-page-link",
    target: "_blank"
  }, "LinkedIn"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://benhsieh-dev.github.io/",
    className: "banking-page-link",
    target: "_blank"
  }, "Personal Site"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    className: "banking-page-transfer-form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Transfer"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "banking-page-input-fields"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "from"
  }, "From", toAccountState === "Roberthood" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    id: "from",
    name: "from",
    className: "banking-page-input",
    onChange: function onChange(e) {
      var selectedFromAccount = e.target.value;
      setFromAccountState(selectedFromAccount);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "Cathay Bank"
  }, "Cathay Bank"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "Roberthood"
  }, "Roberthood")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    id: "from",
    name: "from",
    className: "banking-page-input",
    onChange: function onChange(e) {
      var selectedFromAccount = e.target.value;
      setFromAccountState(selectedFromAccount);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "Roberthood"
  }, "Roberthood"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "Cathay Bank"
  }, "Cathay Bank"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "to"
  }, "To", fromAccountState === "Cathay Bank" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    id: "to",
    name: "to",
    className: "banking-page-input",
    onChange: function onChange(e) {
      var selectedToAccount = e.target.value;
      setToAccountState(selectedToAccount);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "Roberthood"
  }, "Roberthood"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "Cathay Bank"
  }, "Cathay Bank")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    id: "to",
    name: "to",
    className: "banking-page-input",
    onChange: function onChange(e) {
      var selectedToAccount = e.target.value;
      setToAccountState(selectedToAccount);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "Cathay Bank"
  }, "Cathay Bank"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "Roberthood"
  }, "Roberthood"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Amount", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "number",
    className: "banking-page-amount",
    placeholder: "$0.00",
    onChange: getValue
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "banking-page-btn",
    onClick: cashBalanceHandler
  }, "Submit"))));
});

/***/ }),

/***/ "./frontend/components/banking/banking_container.jsx":
/*!***********************************************************!*\
  !*** ./frontend/components/banking/banking_container.jsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _banking__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./banking */ "./frontend/components/banking/banking.jsx");
/* harmony import */ var _actions_session__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions/session */ "./frontend/actions/session.js");





var msp = function msp(state) {
  return {
    currentUser: state.session.currentUser
  };
};

var mdp = function mdp(dispatch) {
  return {
    logout: function logout() {
      return dispatch(Object(_actions_session__WEBPACK_IMPORTED_MODULE_3__["logout"])());
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(msp, mdp)(_banking__WEBPACK_IMPORTED_MODULE_2__["default"]));

/***/ })

}]);
//# sourceMappingURL=5.bundle.js.map