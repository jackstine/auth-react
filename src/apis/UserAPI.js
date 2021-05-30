import WebAPI from './WebAPI'
const API = 'http://localhost:8080'
// TODO config

class UserAPI extends WebAPI {
  constructor () {
    super({endpoint: API + '/user'})
  }
  createUser(user) {
    return this.__post(undefined, {user})
  }
  forgotPassword(email) {
    return this.__post('/password/forgot', {email})
  }
}

export default UserAPI
