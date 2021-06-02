import {useState} from "react"
import Email from '../common-components/Fields/Email'
import UserAPI from '../apis/UserAPI'

const ForgotPassword = function (props) {
  let [email, setEmail] = useState('')
  let [submitting, setSubmitting] = useState(false)
  let [requestSent, setRequestSent] = useState(false)
  let [failed, setFailed] = useState(false)
  let handleSubmit = function (e) {
    setSubmitting(true)
    e.preventDefault()
    new UserAPI().forgotPassword(email).then(resp => {
      if (resp) {
        setRequestSent(true)
      } else {
        setSubmitting(false)
        setFailed(true)
      }
    }).catch(err => {
      setSubmitting(false)
    })
  }
  let emailSubmitted = `An email has been sent to ${email}`
  let FailedSubmit = `The email you have used does not exist`
  return (
    <div>
      {!requestSent &&
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <Email id="email" name="email"
            value={email} onChange={setEmail}
          />
          {failed && <div>{FailedSubmit}</div>}
          <button disabled={submitting}>Forgot Password</button>
        </form>
      }
      {requestSent &&
        emailSubmitted
      }
    </div>
  )
}

export default ForgotPassword
