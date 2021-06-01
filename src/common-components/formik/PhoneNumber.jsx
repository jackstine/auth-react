import {Field} from 'formik'
import * as Yup from 'yup'

const parse_Number = value => {
	if (!value) {
		return value;
  }
  value = value.toString().replace(/[()-]/g,'')
  let num = Number(value.replace(/[^\d]/g, ''));
  return num === 0 ? undefined : num
}

const format_Phone = e => {
  let isEvent = (e?.target?.value)
  let value = isEvent ? e.target.value : e
  let newValue = ''
	if (value) {
    value = parse_Number(value)
    if (value) {
      const onlyNums = String(value);
      if (onlyNums.length <= 3) {
        newValue = `(${onlyNums}`;
      } else if (onlyNums.length < 7) {
        newValue = `(${onlyNums.slice(0, 3)}) - ${onlyNums.slice(3)}`;
      } else {
        newValue = `(${onlyNums.slice(0, 3)}) - ${onlyNums.slice(3, 6)} - ${onlyNums.slice(6,10)}`;
      }
    }
  }
  if (isEvent) {
    e.target.value = newValue
    return e
  } else {
    return newValue
  }
}

const validateNumber = function (value) {
  let schema = Yup.string().length(18)
  try {
    schema.validateSync(value)
    return null
  } catch (ex) {
    return ex.message
  }
}


const PhoneNumber = function (props) {
  let {handleChange, label, ...rest} = props
  return (
    <div>
      <label>{label}</label>
      <Field
        validate={validateNumber}
        type="text"
        onChange={e => handleChange(format_Phone(e))} 
        {...rest}
      />
    </div>
  )
}

export default PhoneNumber
export {parse_Number, format_Phone}
