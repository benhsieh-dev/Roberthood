
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  YAxis,
} from "recharts";
import axios from "../axios-quotes";
import { TickerSymbols } from "../../../public/tickers.js";

export default ({ currentUser, logout }) => {
  const [searchValue, setSearchValue] = useState("");
  const [quote, setQuote] = useState({ symbol: "qqq" }); // Initialize with an object
  const [chartData, setChartData] = useState([]);
  const [news, setNews] = useState([]);
  const [show, setShow] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState([]);
  const [stock, setStock] = useState([]);
  const [shares, setShares] = useState(0);
  const [sharesError, setSharesError] = useState(null);

  useEffect(() => {
    document.title = "Portfolio | Roberthood";
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (news.length < 1) {
      $.ajax("/api/news/new").done((res) => {
        if (isMounted) {
          setNews(news.concat(res.articles));
        }
      });
    }

    if (quote.symbol) {
      $.ajax(`/api/stocks/chart/${quote.symbol}`).done((res) => {
              debugger
        if (isMounted) setChartData(res);
      });

      $.ajax(`/api/stocks/quote/${quote.symbol}`).done((res) => {
        if (isMounted) setQuote(res);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [quote.symbol, news]);

  const dashboardSearch = () => {
    if (searchValue) {
      $.ajax(`/api/stocks/quote/${searchValue}`).done((res) => {
        console.log("Quote searchValue" + searchValue);
        console.log("Quote res" + res);
        setQuote(res);
      });

      $.ajax(`/api/stocks/chart/${searchValue}`).done((res) => {
        setChartData(res);
      });
      routeChangeDashboardStocksPage(`/stocks/${searchValue}`);
    }
  };

  const handleOnChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dashboardSearch();
    }
  };

  const operation = () => {
    setShow(!show);
  };

  const postDataHandler = () => {
    axios
      .post(`./${currentUser.username}.json`, quote)
      .then(
        (document.querySelector(".watchlist_btn").textContent =
          "Added to Watchlist")
      )
      .catch((error) => console.log(error));
  };

  const history = useHistory();
  const routeChange = () => {
    let path = `/account`;
    history.push(path);
  };

  const routeChangeDashboardStocksPage = (ticker) => {
    let path = ticker;
    history.push(path);
  };

  const watchlistChecker = () => {
    for (let watchlistItem of stock) {
      if (watchlistItem.symbol === quote.symbol) {
        return (
          <button
            className="watchlist_btn"
            onClick={deleteWatchlistItemHandler(watchlistItem)}
          >
            - Remove from Lists
          </button>
        );
      }
    }

    return (
      <button className="watchlist_btn" onClick={postDataHandler}>
        + Add to Lists
      </button>
    );
  };

  const deleteWatchlistItemHandler = (watchlistItem) => {
    return (event) => {
      event.preventDefault();
      axios
        .delete(`./${currentUser.username}/${watchlistItem.firebaseID}.json`)
        .catch((error) => console.log(error));
    };
  };

  const predictiveSearch = (item) => {
    setSearchValue(item.symbol);
    dashboardSearch();
    setSearchValue("");
  };

  return <div>{/* Your JSX code remains the same */}</div>;
};

  
  
