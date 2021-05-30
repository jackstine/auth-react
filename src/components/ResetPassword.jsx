import { useState } from 'react'
import PasswordMustMatchField from '../common-components/Fields/PasswordsMustMatch'



const ResetPassword = function (props) {
  let [password, setPassword] = useState('')
  let [submitted, setSubmitting] = useState(false)
  let message = "Reset your password"
  const handleSubmit = function (e) {
    setSubmitting(true)
    e.preventDefault()
    console.log(password)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {message}
      </div>
      <PasswordMustMatchField name="password" id="password" 
        onChange={setPassword}
      />
      <button disabled={submitted}>Submit</button>
    </form>
  )
}