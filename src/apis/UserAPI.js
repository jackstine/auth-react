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
  resetPasswordWithTemp(user_id, tempPassword, newPassword) {
    return this.__post('/password/forgot/reset', {user_id, tempPassword, newPassword})
  }
  verifyUser(verificationCode) {
    return this.__post('/verify', {verificationCode})
  }
}

export default UserAPI
