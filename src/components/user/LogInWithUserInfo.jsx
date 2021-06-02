import { useState } from "react"
import Email from "../../common-components/Fields/Email"
import AuthAPI from '../../apis/AuthAPI'
import Cookies from '../../store/cookies'
import {useHistory} from 'react-router-dom'
import {ROUTES} from '../../router'


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
      console.log('sdlkfjlkasdjf')
      setSubmitted(false)
      setFailedSubmit(true)
    })
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

export default LogInWithUserInfo
