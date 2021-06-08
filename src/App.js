import React, { useEffect } from 'react';
import './App.css';
import Cookie from './store/cookies'
import AuthAPI from './apis/AuthAPI'
import { UserProvider, UserConsumer, ACTIONS } from './store/contexts/UserContext';
import { SubProvider } from "./store/contexts/SubscriptionContext";

const Providers = function (props) {
  return (
    <UserProvider>
      <SubProvider>
        {props.children}
      </SubProvider>
    </UserProvider>
  )
}

const AppPart2 = function (props) {
  useEffect(() => {
    let userAuth = Cookie.AuthToken.get()
    new AuthAPI().verifyToken(userAuth).then(resp => {
      if (resp.success) {
        props.user.dispatch({state: resp.user, type: ACTIONS.SET})
      }
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        {props.children}
      </header>
    </div>
  )
}

const App = function (props) {
  return (
    <Providers>
      <UserConsumer>
        {(user) => (
          <AppPart2 user={user}>
            {props.children}
          </AppPart2>
        )}
      </UserConsumer>
    </Providers>
  );
}

export default App;
