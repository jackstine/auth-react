import {useState} from 'react'
import PasswordMustMatchField from '../common-components/Fields/PasswordsMustMatch'
import PhoneNumber from '../common-components/Fields/PhoneNumber'
import Email from '../common-components/Fields/Email'
import * as yup from 'yup'

const UserEditForm = function () {
  let [firstName, setFirstName] = useState('')
  let [lastName, setLastName] = useState('')
  let [email, setEmail] = useState('')
  let [phoneNumber, setPhoneNumber] = useState('')
  let [password, setPassword] = useState('')
  let [submitting, setSubmitting] = useState(false)
  const handleSubmit = function (e) {
    setSubmitting(true)
    e.preventDefault()
    let object = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber
    }
    let yupValidation = yup.object().shape({
      firstName: yup.string().required().min(2).max(100).trim(),
      lastName: yup.string().required().min(2).max(100).trim(),
      email: yup.string().required().min(2).email().trim(),
      phoneNumber: yup.string().required().length(10),
      password: yup.string().required().min(8).max(16).trim()
    })
    try {
      yupValidation.validateSync(object);
      let valid = yupValidation.isValidSync(object)
      console.log(valid)
      if (valid) {
        // TODO send to API for creating the user
        console.log(object)
        setSubmitting(true)
      }
    } catch (ex) {
      let message = ex.message
      // TODO add error message for the client to see
      console.log(message)
      setSubmitting(false)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input name="firstName" id="firstName" type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}/>
      </div>
      <div>
        <label>Last Name</label>
        <input name="lastName" id="lastName" type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </div>
      <Email name="email" id="email"
        value={email} onChange={setEmail}
      />
      <div>
      <PhoneNumber name="phoneNumber" id="phoneNumber"
        value={phoneNumber} onChange={setPhoneNumber}
      />
      </div>
      <PasswordMustMatchField name="password" id="password"
        onChange={setPassword}
      />
      <button type="submit" disabled={submitting} >Submit</button>
    </form>
  )
}

export default UserEditForm
