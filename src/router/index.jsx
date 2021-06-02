import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import App from '../App'
import {UserProvider} from '../store/contexts/UserContext'
import Home from './route-pages/Home'
import LandingPage from '../views/LandingPage'
import UserPage from '../views/UserPage'
import VerifyUserView from "../views/VerifyUserView";
import DevPage from '../views/DevPage'

const ROUTES = {
  LANDING: '/',
  HOME: '/home',
  SIGN_UP: '/home/signup',
  LOGIN: '/home/login',
  USER: "/user",
  VERIFY: "/verifyuser",
  DEV_: '/devpage',
  NEW: '/new'
}

const Router = function () {
  return (
    <App>
      <BrowserRouter>
        <UserProvider>
          <Switch>
            <Route exact path={ROUTES.LANDING} component={LandingPage}/>
            <Route strict path={ROUTES.HOME} component={Home}/>
            <Route strict path={ROUTES.USER} component={UserPage} />
            <Route exact path={ROUTES.VERIFY} component={VerifyUserView} />
            <Route exact path={ROUTES.DEV_} component={DevPage} />
          </Switch>
        </UserProvider>
      </BrowserRouter>
    </App>
  )
}

export default Router
export {ROUTES}
