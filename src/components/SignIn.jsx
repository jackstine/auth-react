import { useState } from "react"
import ForgotPassword from "./ForgotPassword"
import Email from "../common-components/Fields/Email"
import AuthAPI from '../apis/AuthAPI'

const SignIn = function (props) {
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [submitted, setSubmitted] = useState(false)
  let [failedSubmit, setFailedSubmit] = useState(false)
  const signUserIn = function (e) {
    setSubmitted(true)
    e.preventDefault()
    let user = {
      email,
      password
    }
    new AuthAPI().login(user).then(resp => {
      if (resp.success) {
        // TODO store the authentication token
        // COOKIES
      }
    })
    setSubmitted(false)
    setFailedSubmit(true)
  }
  let invalidMessage = 'the email or the password you entered is invalid'
  return (
    <div>
      <form onSubmit={signUserIn}>
        {failedSubmit && invalidMessage}
        <Email id="email" name="email"
          value={email} onChange={setEmail}
        />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" 
          value={password} onChange={e => setPassword(e.target.value)}
        />
        <button disabled={submitted}>Submit</button>
      </form>
      <div onClick={props.handleForgotPassword}>Forgot password</div>
    </div>
  )
}

const SignInForm = function (props) {
  let [showForgotPassword, setShowForgotPassword] = useState(false)
  const handleForgotPassword = () => {
    setShowForgotPassword(true)
  }
  return (
    <div>
      {!showForgotPassword && 
        <SignIn handleForgotPassword={handleForgotPassword} />
      }
      {showForgotPassword &&
        <ForgotPassword />
      }
    </div>
  )
}

export default SignInForm