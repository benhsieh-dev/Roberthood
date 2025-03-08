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




/* harmony default export */ __webpack_exports__["default"] = (_ref => {
  let currentUser = _ref.currentUser,
    logout = _ref.logout;
  const _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(""),
    _useState2 = _slicedToArray(_useState, 2),
    searchValue = _useState2[0],
    setSearchValue = _useState2[1];
  const _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(""),
    _useState4 = _slicedToArray(_useState3, 2),
    quote = _useState4[0],
    setQuote = _useState4[1];
  // console.log("currentUser", currentUser);
  const _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
    _useState6 = _slicedToArray(_useState5, 2),
    show = _useState6[0],
    setShow = _useState6[1];
  const _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
    _useState8 = _slicedToArray(_useState7, 2),
    portfolioValue = _useState8[0],
    setPortfolioValue = _useState8[1];
  const _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
    _useState10 = _slicedToArray(_useState9, 2),
    stock = _useState10[0],
    setStock = _useState10[1];
  const ticker = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useParams"])();
  const _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("Cathay Bank"),
    _useState12 = _slicedToArray(_useState11, 2),
    fromAccountState = _useState12[0],
    setFromAccountState = _useState12[1];
  const _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("Roberthood"),
    _useState14 = _slicedToArray(_useState13, 2),
    toAccountState = _useState14[0],
    setToAccountState = _useState14[1];
  const _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null),
    _useState16 = _slicedToArray(_useState15, 2),
    cashBalance = _useState16[0],
    setCashBalance = _useState16[1];
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    document.title = "Account | Robinhood";
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    Object(_axios_quotes__WEBPACK_IMPORTED_MODULE_2__["default"])({
      method: "GET",
      url: `https://roberthood-edcdd.firebaseio.com/portfolios/${currentUser.username}.json`
    }).then(res => {
      const total = [];
      for (let stock in res.data) {
        total.push(_objectSpread(_objectSpread({}, res.data[stock]), {}, {
          firebaseID: stock
        }));
      }
      setPortfolioValue(total);
      // console.log(res.data);
    }).catch(error => console.log(error));
  }, [portfolioValue]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    Object(_axios_quotes__WEBPACK_IMPORTED_MODULE_2__["default"])({
      method: "GET",
      url: `https://roberthood-edcdd.firebaseio.com/${currentUser.username}.json`
    }).then(res => {
      const watchlist = [];
      for (let stock in res.data) {
        watchlist.push(_objectSpread(_objectSpread({}, res.data[stock]), {}, {
          firebaseID: stock
        }));
      }
      setStock(watchlist);
      // console.log(res.data);
    }).catch(error => console.log(error));
  });
  const accountSearch = () => {
    $.ajax(`/api/stocks/quote/${searchValue}`).done(res => {
      console.log(res);
      setQuote(res);
    });
    $.ajax(`/api/stocks/chart/${searchValue}`).done(res => {
      // console.log(res);
      setChartData(res);
    });
    routeChangeAccountStocksPage(`/stocks/${searchValue}`);
  };
  const handleOnChange = event => {
    setSearchValue(event.target.value);
  };
  const handleKeyPress = event => {
    if (event.key === "Enter") {
      accountSearch();
    }
  };
  const operation = () => {
    setShow(!show);
  };
  const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"])();
  const routeChangeAccountStocksPage = ticker => {
    let path = ticker;
    history.push(path);
  };
  const predictiveSearch = item => {
    setSearchValue(item.symbol);
    accountSearch();
    setSearchValue("");
  };
  const getValue = event => {
    setCashBalance(event.target.value);
    // console.log(`Event: ${event.target.value}`); 
    // console.log(`State: ${cashBalance}`); 
  };
  const cashBalanceHandler = event => {
    event.preventDefault();
    // const data = {
    //   Cash:cashBalance
    // }
    _axios_quotes__WEBPACK_IMPORTED_MODULE_2__["default"].patch(`./portfolios/${currentUser.username}/Cash.json`, {
      cashBalance
    }).then(console.log(`State: ${cashBalance}`));
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
    onChange: event => {
      handleOnChange(event);
    },
    value: searchValue,
    onKeyPress: handleKeyPress,
    alt: "search"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "auto-suggestions"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, _public_tickers__WEBPACK_IMPORTED_MODULE_3__["TickerSymbols"].map(name => {
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
    class: "fab fa-angellist menu-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://angel.co/u/ben-hsieh-6",
    target: "_blank"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "dropdown-menu-item"
  }, "AngelList"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "dropdown-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    class: "fab fa-github menu-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://github.com/benhsieh-dev",
    target: "_blank"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "dropdown-menu-item"
  }, "GitHub"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "dropdown-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    class: "fab fa-linkedin-in menu-icon"
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
    class: "fas fa-university menu-icon"
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
    onChange: e => {
      const selectedFromAccount = e.target.value;
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
    onChange: e => {
      const selectedFromAccount = e.target.value;
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
    onChange: e => {
      const selectedToAccount = e.target.value;
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
    onChange: e => {
      const selectedToAccount = e.target.value;
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




const msp = state => {
  return {
    currentUser: state.session.currentUser
  };
};
const mdp = dispatch => ({
  logout: () => dispatch(Object(_actions_session__WEBPACK_IMPORTED_MODULE_3__["logout"])())
});
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(msp, mdp)(_banking__WEBPACK_IMPORTED_MODULE_2__["default"]));

/***/ })

}]);
//# sourceMappingURL=5.bundle.js.map