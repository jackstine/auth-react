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


const Router = function () {
  return (
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/user/create" component={FormikUserFields} />
          <Route path="/user" component={UserPage} />
          <Route exact path="/user/verify" component={VerifyUserView} />
        </Switch>
      </App>
    </BrowserRouter>
  )
}

export default Router
