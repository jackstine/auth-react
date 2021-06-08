import WebAPI from './WebAPI'
import config from '../config'

class ProductsAPI extends WebAPI {
  constructor() {
    super({endpoint: config.API + '/products'})
  }

  getProducts() {
    return this.__get('', null, {auth: false})
  }
}

export default ProductsAPI
