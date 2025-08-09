import React from 'react';
import { Link } from 'react-router-dom'; 

const initialState = {
  username: "",
  password: "",
  usernameError: "",
  passwordError: "",
  credentialsError: ""
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState; 

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  componentDidMount() {
    document.title = "Log In | Roberthood"; 
  }

  handleInput(type) {
    return (e) => {
      this.setState({ [type]: e.target.value });
    };
  }

  validate() {
      let usernameError = "";
      let passwordError = "";
      let credentialsError = "";

      if (!this.state.username) {
        usernameError = "Username cannot be blank";
      }

      if (this.state.password.length < 6) {
        passwordError = "Password must have minimim of 6 characters"
      }
      
      if (!this.state.currentUser) {
        credentialsError = "Unable to login with provided credentials";
      }

      if (usernameError || passwordError || credentialsError) {
        this.setState({ usernameError, passwordError, credentialsError});
        return false; 
      }

      return true; 
  }

  handleSubmit(e) {
    e.preventDefault();
    const isValid = this.validate(); 
    if (isValid) {
      this.props.login(this.state.username, this.state.password)
        .then(() => this.props.history.push('/dashboard'))
        .catch(() => {
          this.setState({ credentialsError: "Unable to login with provided credentials" });
        });
    }
  }

  handleDemo(e) {
    e.preventDefault();
    this.props
      .login("bqh5026", "password")
      .then(() => this.props.history.push("/dashboard"))
      .catch(() => {
        this.setState({ credentialsError: "Unable to login with demo credentials" });
      });
  }

  render() {

    return (
      <div>
        <div className="sign-in-container">
          <div className="image-container"></div>

          <div className="sign-in-form">
            <br className="break" />
            <br className="break" />
            <br className="break" />
            <br className="break" />
            <br className="break" />
            <br className="break" />
            <br className="break" />
            <br className="break" />
            <br className="break" />
            <br className="break" />
            <br className="break" />
            <br className="break" />
            <br className="break" />
            <br className="break" />
            <br className="break" />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <form className="login-form">
              <h1 className="sign-in-header">Welcome to Roberthood</h1>
              <span className="label">Username</span>
              <br />
              <br />
              <input
                name="username"
                className="input"
                type="text"
                value={this.state.username}
                onChange={this.handleInput("username")}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.usernameError ? (
                  <i className="fas fa-exclamation-circle fa-fw"></i>
                ) : (
                  ""
                )}
                {this.state.usernameError}
              </div>
              <br />
              <br />
              <span className="label">Password</span>
              <br />
              <br />
              <input
                name="password"
                className="input"
                type="password"
                value={this.state.password}
                onChange={this.handleInput("password")}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.passwordError ? (
                  <i className="fas fa-exclamation-circle fa-fw"></i>
                ) : (
                  ""
                )}
                {this.state.passwordError}
              </div>
              <br />
              <br />
              <Link to="/signup">
                <span className="signup_link">
                  Sign up for a new account if not already have one
                </span>
              </Link>
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.credentialsError ? (
                  <i className="fas fa-exclamation-circle fa-fw"></i>
                ) : (
                  ""
                )}
                {this.state.credentialsError}
              </div>
              <br />
              <br />
              <button className="sign-in-btn" onClick={this.handleSubmit}>
                Sign In
              </button>
              <br />
              <br />
            </form>
            <div className="demo-user">
              <form>
                <input type="hidden" value="" />
                <input type="hidden" value="" />
                <button className="demo-user-btn" onClick={this.handleDemo}>
                  Demo User
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login 



