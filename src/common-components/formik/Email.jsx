import * as Yup from 'yup'
import {Field} from 'formik'

const validateEmail = function (value) {
  let schema = Yup.string().email()
  try {
    schema.validateSync(value)
  } catch (ex) {
    return ex.message
  }
}

const Email = function (props) {
  return (
    <div>
      <label htmlFor={props.name}>Email</label>
      <Field validate={validateEmail}
        type="email"
        {...props}
      />
    </div>
  )
}

export default Email
