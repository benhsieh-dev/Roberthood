import React, {lazy, Suspense} from 'react';

import { AuthRoute, ProtectedRoute } from "../utils/route_util";

const LoginContainer = lazy(() => import("./session/login_container"));
const SignupContainer = lazy(() => import("./session/signup_container"));
const DashboardContainer = lazy(() =>
  import("./dashboard/dashboard_container")
);
const AccountContainer = lazy(() => import("./account/account_container"));
const BankingContainer = lazy(() => import("./banking/banking_container"));
const PortfolioContainer = lazy(() => import("./portfolio/portfolio_container"));
const StocksContainer = lazy(() => import("./stocks/stocks_container"));
const Home = lazy(() => import("./home/home"));


export default () => (
  <div>
      <Suspense fallback={<div>Error loading page</div>}>
          <AuthRoute exact path="/" component={Home} />
          <AuthRoute path="/signup" component={SignupContainer} />
          <AuthRoute path="/login" component={LoginContainer} />
          <ProtectedRoute path="/dashboard" component={DashboardContainer} />
          <ProtectedRoute path="/portfolio" component={PortfolioContainer} />
          <ProtectedRoute exact path="/account" component={AccountContainer} />
          <ProtectedRoute path="/account/banking" component={BankingContainer} />
          <ProtectedRoute path="/stocks/:ticker" component={StocksContainer} />
      </Suspense>
  </div>
);




   
  