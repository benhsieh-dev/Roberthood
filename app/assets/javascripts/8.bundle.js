(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./frontend/components/session/signup.jsx":
/*!************************************************!*\
  !*** ./frontend/components/session/signup.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");


const initialState = {
  first_name: "",
  last_name: "",
  username: "",
  password: "",
  first_nameError: "",
  last_nameError: "",
  usernameError: "",
  passwordError: ""
};
class Signup extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInput(type) {
    return e => this.setState({
      [type]: e.target.value
    });
  }
  validate() {
    let first_nameError = "";
    let last_nameError = "";
    let usernameError = "";
    let passwordError = "";
    if (!this.state.first_name) {
      first_nameError = "Please enter your first name";
    }
    if (!this.state.last_name) {
      last_nameError = "Please enter your last name";
    }
    if (!this.state.username) {
      usernameError = "Please enter your username";
    }
    if (this.state.password.length < 6) {
      passwordError = "Your password must have be at least 6 characters";
    }
    if (first_nameError || last_nameError || usernameError || passwordError) {
      this.setState({
        first_nameError,
        last_nameError,
        usernameError,
        passwordError
      });
      return false;
    }
    return true;
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   this.props
  //     .createNewUser(this.state)
  //     .then(() => this.props.history.push("/dashboard"));
  // }

  handleSubmit(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.props.createNewUser(this.state).then(() => this.props.history.push("/dashboard"));
    }
  }
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      className: "signup-form"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "signup-navbar"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
      to: "/"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "signup-title"
    }, ' ', "Roberthood"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      className: "signup-logo",
      src: roberthoodHatURL
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "signup-header"
    }, "Make Your Money Move"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: "signup-subheader"
    }, "Roberthood lets you invest in companies you love, commission-free.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "firstname-lastname"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      className: "signup-input1",
      type: "text",
      value: this.state.first_name,
      onChange: this.handleInput("first_name"),
      placeholder: "First name"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      className: "signup-input1",
      type: "text",
      value: this.state.last_name,
      onChange: this.handleInput("last_name"),
      placeholder: "Last name"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      className: "signup-input2",
      type: "text",
      value: this.state.username,
      onChange: this.handleInput("username"),
      placeholder: "Username"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      className: "signup-input2",
      type: "password",
      value: this.state.password,
      onChange: this.handleInput("password"),
      placeholder: "Password"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "signup-btn",
      onClick: this.handleSubmit
    }, "Continue"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
      to: "/login"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "application"
    }, "Already an user?", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "application-continue"
    }, "Proceed to login page.")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "signup-error-messages"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, this.state.first_nameError), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, this.state.last_nameError), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, this.state.usernameError), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, this.state.passwordError))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)));
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Signup);

//  <div>
//    <img className="signup-form-footer-image" src={signupFormFooterURL} />
//  </div>;

/***/ }),

/***/ "./frontend/components/session/signup_container.js":
/*!*********************************************************!*\
  !*** ./frontend/components/session/signup_container.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../actions/session */ "./frontend/actions/session.js");
/* harmony import */ var _signup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./signup */ "./frontend/components/session/signup.jsx");



const mdp = dispatch => ({
  createNewUser: formUser => dispatch(Object(_actions_session__WEBPACK_IMPORTED_MODULE_1__["createNewUser"])(formUser))
});
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(null, mdp)(_signup__WEBPACK_IMPORTED_MODULE_2__["default"]));

/***/ })

}]);
//# sourceMappingURL=8.bundle.js.map