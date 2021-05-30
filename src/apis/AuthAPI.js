import WebAPI from './WebAPI'
// TODO config
const API = 'http://localhost:8080'

class AuthAPI extends WebAPI {
  constructor() {
    super({endpoint: API + '/auth'})
  }

  login(user) {
    return this.__post('/login', {user})
  }
}

export default AuthAPI
