import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import App from '../App'
import Home from './route-pages/Home'
import LandingPage from '../views/LandingPage'
import UserPage from '../views/UserPage'
import VerifyUserView from "../views/VerifyUserView";
import DevPage from '../views/DevPage'
import CustomerProfile from '../views/CustomerProfile'

const ROUTES = {
  LANDING: '/',
  HOME: '/home',
  SIGN_UP: '/home/signup',
  PLANS: '/home/plans',
  LOGIN: '/home/login',
  USER: "/user",
  VERIFY: "/verifyuser",
  DEV_: '/devpage',
  NEW: '/new',
  CUSTOMER_PROFILE: '/customer'
}

const Router = function () {
  return (
    <App>
      <BrowserRouter>
        <Switch>
          <Route exact path={ROUTES.LANDING} component={LandingPage}/>
          <Route strict path={ROUTES.HOME} component={Home}/>
          <Route strict path={ROUTES.USER} component={UserPage} />
          <Route exact path={ROUTES.VERIFY} component={VerifyUserView} />
          <Route exact path={ROUTES.CUSTOMER_PROFILE} component={CustomerProfile} />
          <Route exact path={ROUTES.DEV_} component={DevPage} />
        </Switch>
      </BrowserRouter>
    </App>
  )
}

export default Router
export {ROUTES}
