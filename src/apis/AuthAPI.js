import WebAPI from './WebAPI'
import config from '../config'

class AuthAPI extends WebAPI {
  constructor() {
    super({endpoint: config.API + '/auth'})
  }

  login(user) {
    return this.__post('/login', {user}, {auth:false})
  }
}

export default AuthAPI
