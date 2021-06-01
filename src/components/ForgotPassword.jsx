import {useState} from "react"
import Email from '../common-components/Fields/Email'
import UserAPI from '../apis/UserAPI'

const ForgotPassword = function (props) {
  let [email, setEmail] = useState('')
  let [sentHandler, setSentHandler] = useState('')
  let handleSubmit = function (e) {
    setSentHandler(true)
    e.preventDefault()
    new UserAPI().forgotPassword(email).then(resp => {
    })
  }
  let emailSubmitted = `An email has been sent to ${email}`
  return (
    <div>
      {!sentHandler &&
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <Email id="email" name="email"
            value={email} onChange={setEmail}
          />
          <button disabled={sentHandler}>Forgot Password</button>
        </form>
      }
      {sentHandler &&
        emailSubmitted
      }
    </div>
  )
}

export default ForgotPassword
