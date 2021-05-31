import {createContext, useReducer} from 'react'
const UserContext = createContext()

const userReducer = function (state, action) {
  console.log({action})
  switch (action.type) {
    case 'set': {
      debugger
      return {...action.state}
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

export {UserProvider, UserContext, UserConsumer}
