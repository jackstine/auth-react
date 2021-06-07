import GoogleLogin from 'react-google-login'
import config from '../config'
import AuthAPI from '../apis/AuthAPI'
import Cookies from '../store/cookies'
import {useHistory} from 'react-router-dom'
import {ROUTES} from '../router'

const GoogleLoginComponent = function (props) {
  let history = useHistory()
  let responseGoogle = function (resp) {
    let user = {
      first_name: resp.profileObj.givenName,
      last_name: resp.profileObj.familyName,
      email: resp.profileObj.email
    }
    // For later use
    // progileObj.imageUrl
    // profileObj.googleId
    // let accessToken = resp.accessToken
    // let googleId = resp.googleId
    user.user_id = user.email
    let token = resp.tokenId
    new AuthAPI().googleSignIn(token).then(resp => {
      if (resp.success) {
        const user = resp.user
        Cookies.AuthToken.set(resp.token)
        props.onCreateUser(user)
        history.push(ROUTES.USER)
      }
    })
  }
  return (
    <GoogleLogin
      clientId={config.googleClientId}
      buttonText="Sign Up"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default GoogleLoginComponent
