import {Field} from 'formik'

const validatePassword = function (value, other) {
  console.log(value, other)
  if (value === other) {
    return null
  } else {
    return 'Passwords do not Match'
  }
}

// NOTE password and retypePassword, must be in formik state.
// if we want to change the state dynamically, 
// please add to the name property
const PasswordsMustMatch = function (props) {
  let {touched, values, errors} = props
  return (
    <div>
      <div>
        {/* // TODO need to hide password and set type as password */}
        <label>Password:</label>
        <Field name="password"
          validate={(value) => {
            return validatePassword(value, props.values.retypePassword)
          }}
        />
      </div>
      <div>
        <label>Retype Password:</label>
        <Field name="retypePassword" 
          validate={(value) => {
            return validatePassword(value, props.values.password)
          }}
        />
      </div>
      {(touched.password && touched.retypePassword && 
        (
          (errors.password && errors.retypePassword) || 
          (values.password.length !== values.retypePassword.length)
        )) && 
        (errors.password || errors.retypePassword)
      }
    </div>
  )
}

export default PasswordsMustMatch
