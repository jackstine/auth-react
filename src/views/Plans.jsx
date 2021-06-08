import React, {useEffect, useCallback, useState} from 'react'
import ProductsAPI from '../apis/ProductAPI'
import Button from '@material-ui/core/Button'
import CustomerAPI from '../apis/CustomerAPI'
import {UserHOC} from '../store/contexts/UserContext'
import { useHistory } from 'react-router'
import { ROUTES } from '../router'
import {SubHOC, SUB_ACTIONS} from '../store/contexts/SubscriptionContext'


const Plans = function (props) {
  let [products, setProducts] = useState([])
  let history = useHistory()
  let user = props.user.state
  let dispatchSub = props.sub.dispatch
  let handleSectedProduct = useCallback((productPrice) => {
    if (user) {
      let product = productPrice.product
      let price = productPrice.price
      let sub = new CustomerAPI().authorizeCustomer(user, product, price)
      if (sub.has_customer) {
        // go to Payment Method Page
        // TODO need to insert Payment Method Page
      } else {
        dispatchSub({
          type: SUB_ACTIONS.ADD_PRICE,
          state: {price: sub.price}
        })
        history.push(ROUTES.CUSTOMER_PROFILE)
      }
    } else {
      // TODO later
      // TODO need to get the plan id information as well
      // got to Sign up page, create user, then be redirected to the
      // customer page --->>>
      history.push(ROUTES.SIGN_UP)
    }
  }, [user, dispatchSub])
  useEffect(() => {
    new ProductsAPI().getProducts().then(prods => {
      console.log(prods)
      setProducts(prods)
    })
  }, [])
  let ListProducts = products.map(el => {
    return (
      <div key={el.prices[0].id}>
        <Button 
          onClick={() => handleSectedProduct(el)}>
            {el.product.name}
        </Button>
        <label>Price: {el.prices[0].unit_amount}</label>
      </div>
    )
  })
  return (
    <div>
      {ListProducts}
    </div>
  )
}

export default SubHOC(UserHOC(Plans))


