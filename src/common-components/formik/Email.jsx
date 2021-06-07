import * as Yup from 'yup'
import TextBox from '../Fields/TextBox'

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
      <TextBox validate={validateEmail} {...props} type="email"
      />
    </div>
  )
}

export default Email
