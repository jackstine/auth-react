import {createContext, useReducer} from 'react'
const UserContext = createContext()

let ACTIONS = {
  SET: 'set',
  UPDATE: 'update'
}

// TODO need to create constants
const userReducer = function (state, action) {
  if (!action.type && !action.state) {
    throw Error('no type or state for userReducer')
  }
  switch (action.type) {
    case ACTIONS.SET: {      
      return {...action.state}
    }
    case ACTIONS.UPDATE: {
      return {...state.state, ...action.state}
    }
    default: {
      return state
    }
  }
}

const UserProvider = function ({children, initialValue}) {
  let init = initialValue ?? {name: 'Guest', isGuest: true}
  let [state, dispatch] = useReducer(userReducer, init)
  const value = {state, dispatch}
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

const UserConsumer = function ({children}) {
  return (<UserContext.Consumer>
    {context => children(context)}
  </UserContext.Consumer>)
}

const UserHOC = function (Component, props) {
  return (propsToAdd) => (<UserContext.Consumer>
    {context => (
      <Component user={context} {...propsToAdd} {...props}/>
    )}
  </UserContext.Consumer>)
}

export {UserProvider, UserContext, UserConsumer, UserHOC, ACTIONS}
