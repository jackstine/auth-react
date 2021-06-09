import {createContext, useReducer} from 'react'
const SubscriptionContext = createContext()

let SUB_ACTIONS = {
  ADD_PRICE: 'add_price',
  SUBSCRIPE_CUSTOMER_WITH_PRICE: 'subCustWP',
  SUBSCRIPE_CUSTOMER: 'subCust'
}

/**
 * 
 * @param {*} state.sub
 * @param {*} state.price
 * @param {*} state.customer
 * @param {*} action 
 * @returns 
 */
const subReducer = function (state, action) {
  switch (action.type) {
    case SUB_ACTIONS.ADD_PRICE: {      
      return {...state, price: action.state.price}
    }
    case SUB_ACTIONS.SUBSCRIPE_CUSTOMER_WITH_PRICE: {
      // should change everything
      return {...state, ...action.state}
    }
    case SUB_ACTIONS.SUBSCRIPE_CUSTOMER: {
      // replaces customer and subscription
      return {...state, ...action.state}
    }
    default: {
      return state
    }
  }
}

const SubProvider = function ({children, initialValue}) {
  let init = initialValue ?? {}
  let [state, dispatch] = useReducer(subReducer, init)
  const value = {state, dispatch}
  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
}

const SubConsumer = function ({children}) {
  return (<SubscriptionContext.Consumer>
    {context => children(context)}
  </SubscriptionContext.Consumer>)
}

const SubHOC = function (Component, props) {
  return (propsToAdd) => (<SubscriptionContext.Consumer>
    {context => (
      <Component sub={context} {...propsToAdd} {...props}/>
    )}
  </SubscriptionContext.Consumer>)
}

export {SubProvider, SubscriptionContext, SubConsumer, SubHOC, SUB_ACTIONS}
