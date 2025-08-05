Depending on the environment setup, may use bundle exec rails s to run the application

# Roberthood

Users can read up on latest business news, check stock quotes, add ticker to watchlist, and buy and sell stocks in a portfolio.

[Live Site](https://roberthood-trading-platform.herokuapp.com/)

## Technologies Used

* Ajax
* Axios
* CSS5
* Firebase Database
* HTML3
* Financial Modeling Prep API
* News API
* Node JS
* Open graph tags
* Redux JS
* React JS
* React Router DOM
* Recharts API
* Ruby on Rails
* React Tabs

One of the technical challenges I faced was providing login errors whe users login with incorrect credentials. The way I solved the issue was to set up states for error as well as mapping the state of current user into the login component. 

```javascript

//login_container.js

const msp = state => ({
  currentUser: state.session.currentUser
})


//login.jsx

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
```
![Roberthood validation](https://user-images.githubusercontent.com/43966507/84723731-451f1500-af54-11ea-81ca-c48cc107b61c.gif)

Another technical challenge was incorporating predictive search in search box. 

This issue was resolved by creating a custom function and passing it a ticker symbol that goes through a list of 8000+ names company name list to return a positive match on the ticker. 

```javascript 

  const predictiveSearch = (item) => {
    setSearchValue(item.symbol);
    search(); 
    ;
    setSearchValue('');
  };

  <div className="auto-suggestions">
      <ul>
        {
          TickerSymbols.map((name) => {
          if (searchValue.length !== 0) {
            if (
              name.symbol
                .toLowerCase()
                .startsWith(searchValue.toLowerCase())
            ) {
              return (
                <li key={name.symbol} onClick={()=>predictiveSearch(name)}>
                  <strong style={{paddingRight: '3rem'}}>{name.symbol}</strong>{name.name}
                </li>
              );
            } else {
              return null;
            }
          }
        })}
      </ul>
</div>

```

![Predictive Search](https://user-images.githubusercontent.com/43966507/85936194-30347100-b8c6-11ea-9ac3-22d104c4f7a5.gif)

## Future Considerations

* Ability to convert virtual cash into and out of virtual stocks
* More comprehensive portfolio view with additional graphical representations

  




