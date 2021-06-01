import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import App from '../App'
import FormikUserFields from '../views/FormikUserFields'
import UserPage from '../views/UserPage'
import VerifyUserView from "../views/VerifyUserView";
import DevPage from '../views/DevPage'
import {UserProvider} from '../store/contexts/UserContext'
import LandingPage from '../views/LandingPage'

const ROUTES = {
  HOME: '/',
  USER: "/user",
  VERIFY: "/user/verify",
  CREATE_USER: "/user/create",
  DEV_: '/devpage'
}

const Router = function () {
  return (
    <BrowserRouter>
      <UserProvider>
        <App>
          <Switch>
            <Route exact path={ROUTES.HOME} component={LandingPage} />
            <Route exact path={ROUTES.CREATE_USER} component={FormikUserFields} />
            <Route exact path={ROUTES.USER} component={UserPage} />
            <Route exact path={ROUTES.VERIFY} component={VerifyUserView} />
            <Route exact path={ROUTES.DEV_} component={DevPage} />
          </Switch>
        </App>
      </UserProvider>
    </BrowserRouter>
  )
}

export default Router
export {ROUTES}
