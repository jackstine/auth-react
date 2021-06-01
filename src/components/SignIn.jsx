import { useState } from "react"
import {Formik, Form} from 'formik'
import ForgotPassword from "./ForgotPassword"
import Email from "../common-components/Fields/Email"
import AuthAPI from '../apis/AuthAPI'
import UserAPI from '../apis/UserAPI'
import PasswordsMustMatch from '../common-components/formik/PasswordsMustMatch'
import Cookies from '../store/cookies'
import {useHistory} from 'react-router-dom'
import {ROUTES} from '../router'
import {UserConsumer} from '../store/contexts/UserContext'

const LogInWithUserInfo = function (props) {
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [submitted, setSubmitted] = useState(false)
  let [failedSubmit, setFailedSubmit] = useState(false)
  let history = useHistory()
  const signUserIn = function (e) {
    setSubmitted(true)
    e.preventDefault()
    let user = {
      email,
      password
    }
    new AuthAPI().login(user).then(resp => {
      if (resp.success) {
        if (resp.verifiedWithTemporary) {
          props.onTempPasswordReceived({inputInfo: user})
          return
        } else {
          Cookies.AuthToken.set(resp.token)
          props.user.dispatch({type:'set', state: resp.user})
          history.push(ROUTES.USER)
        }
      }
      setSubmitted(false)
    })
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
    </div>
  )
}

const CreateNewPassword = function (props) {
  let history = useHistory()
  const onCreateNewPassword = function (password) {
    new UserAPI().resetPasswordWithTemp(
      props.tempPass.inputInfo.email, props.tempPass.inputInfo.password,
      password.password
    ).then(resp => {
      if (resp.success) {
        Cookies.AuthToken.set(resp.token)
        history.push(ROUTES.USER)
        props.user.dispatch({type: 'set', state: resp.user})
      } else {

      }
    })
  }
  return (
    <Formik
      initialValues={{
        password: '',
        retypePassword: ''
      }}
      onSubmit={(values) => {
        onCreateNewPassword(values)
      }}
    >
      {(props) => (
        <Form>
          <PasswordsMustMatch {...props} />
          <button disabled={props.isSubmitting} type="submit">Reset Password</button>
        </Form>
      )}
    </Formik>
  )
}

const SignIn = function () {
  let [showRetypePassword, setShowRetypePassword] = useState(false)
  let [tempPass, setTempPass] = useState({})
  const handleTempPassword = function (tempPassInfo) {
    console.log('HIT RETYP PASSWORD')
    setShowRetypePassword(true)
    setTempPass(tempPassInfo)
  }
  return (
    <UserConsumer>
      {(user) => {
        return (
          <div>
            {!showRetypePassword && 
              <LogInWithUserInfo
                user={user}
                onTempPasswordReceived={handleTempPassword} 
              />
            }
            {showRetypePassword && 
              <CreateNewPassword tempPass={tempPass} user={user} />
            }
          </div>
        )
      }}
    </UserConsumer>
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
        <div>
          <SignIn handleForgotPassword={handleForgotPassword} />
          <div onClick={handleForgotPassword}>Forgot password</div>
        </div>
      }
      {showForgotPassword &&
        <ForgotPassword />
      }
    </div>
  )
}

export default SignInForm
