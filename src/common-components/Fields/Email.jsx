import { useEffect, useState } from "react"
import * as Yup from 'yup'

let emailValid = Yup.string().email()

const Email = (props) => {
  let {onChange, ...rest} = props
  let [email, setEmail] = useState('')
  let [valid, setValid] = useState('')
  let [touched, setTouched] = useState(false)
  useEffect(() => {
    let isValid = emailValid.isValidSync(email)
    setValid(isValid)
    if (isValid) {
      onChange(email)
    } else {
      onChange(null)
    }
  }, [setValid, onChange, email])
  let handleBlur = function (e) {
    setTouched(true)
  }
  return (
    <div>
      <label>Email</label>
      <input type="email" {...rest}
        value={email} onChange={e => setEmail(e.target.value)}
        onBlur={handleBlur}
      />
      {(!valid && touched) && `Email is not valid`}
    </div>
  )
}
/**
 * 1. user clicks characters
 * 2. state of email keeps own value
 * 3. if the state of email is valid, send valid value
 * 4. if not send null
 * 5. validate the email, if not valid then set invalid flag
 * 6. if invalid, show email message
 */

/**
 * 1. checkAsync
 * 2. checkEmailValidation
 */

export default Email
