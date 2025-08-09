import React from 'react';
import {Link} from 'react-router-dom';

// Import the image asset
const roberthoodHatURL = '/assets/roberthood_hat.png';

const initialState = {
  first_name: "",
  last_name: "",
  username: "",
  password: "",
  first_nameError: "",
  last_nameError: "",
  usernameError: "",
  passwordError: "",
};

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(type) {
    return (e) => this.setState({ [type]: e.target.value });
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
      this.setState({ first_nameError, last_nameError, usernameError, passwordError });
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
      this.props
        .createNewUser(this.state)
        .then(() => this.props.history.push("/dashboard"));
    }
  }


  render() {
    return (
      <div>
        <form className="signup-form">
          <div className="signup-navbar">
            <Link to="/">
              <span className="signup-title">{' '}Roberthood</span><img className="signup-logo" src={roberthoodHatURL} />
            </Link>
            {/* <Link className="active" to="#">
              Account
            </Link>
            <Link className="signup-navbar-item" to="#">
              Basic Info
            </Link>
            <Link className="signup-navbar-item" to="#">
              Identity
            </Link>
            <Link className="signup-navbar-item" to="#">
              Funding
            </Link>
            <Link className="signup-navbar-item" to="#">
              Submit
            </Link> */} 
          </div>
          <hr />

          <div>
            <h1 className="signup-header">Make Your Money Move</h1>
            <h3 className="signup-subheader">
              Roberthood lets you invest in companies you love, commission-free.
            </h3>
          </div>
          <div className="firstname-lastname">
            <input
              className="signup-input1"
              type="text"
              value={this.state.first_name}
              onChange={this.handleInput("first_name")}
              placeholder="First name"
            />
            <input
              className="signup-input1"
              type="text"
              value={this.state.last_name}
              onChange={this.handleInput("last_name")}
              placeholder="Last name"
            />
          </div>
          <br />
          <br />
          <input
            className="signup-input2"
            type="text"
            value={this.state.username}
            onChange={this.handleInput("username")}
            placeholder="Username"
          />
          <br />
          <br />
          <br />
          <input
            className="signup-input2"
            type="password"
            value={this.state.password}
            onChange={this.handleInput("password")}
            placeholder="Password"
          />
          <br />
          <br />
          <br />
          <button className="signup-btn" onClick={this.handleSubmit}>
            Continue
          </button>
          <br />
          <br />
          <br />
          <div>
            <Link to="/login">
              <p className="application">
                Already an user?{" "}
                <span className="application-continue">
                  Proceed to login page.
                </span>
              </p>
            </Link>
          </div>
          <div>
            <ul className="signup-error-messages">
              <li>
                {this.state.first_nameError}
              </li>
              <li>
                {this.state.last_nameError}
              </li>
              <li>
                {this.state.usernameError}
              </li>
              <li>
                {this.state.passwordError}
              </li>
            </ul>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
        </form>
      </div>
    );
  }
}

export default Signup; 

  //  <div>
  //    <img className="signup-form-footer-image" src={signupFormFooterURL} />
  //  </div>;