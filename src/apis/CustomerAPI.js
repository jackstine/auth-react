import WebAPI from './WebAPI'
import config from '../config'

class CustomerAPI extends WebAPI {
  constructor() {
    super({endpoint: config.API + '/customers'})
  }

  authorizeCustomer(user, product, price) {
    let customerPriceInfo = {
      user,
      product,
      price
    }
    return this.__post('/authorize', customerPriceInfo, {auth: false})
  }

  authorizeCreateCustomer (user, customer, price) {
    return this.__post('/authorize/customer', {user, customer, price})
  }

  authorizeSale (sub, paymentMethod, customer) {
    return this.__post('/authorize/sale', {sub, paymentMethod, customer})
  }
}

export default CustomerAPI
