const format_Phone = value => {
	if (!value) {
		return value;
	}
	const onlyNums = String(value);
	if (onlyNums.length <= 3) {
		return `(${onlyNums}`;
	}
	if (onlyNums.length < 7) {
		return `(${onlyNums.slice(0, 3)}) - ${onlyNums.slice(3)}`;
	}
	return `(${onlyNums.slice(0, 3)}) - ${onlyNums.slice(3, 6)} - ${onlyNums.slice(6,10)}`;
}

const parse_Number = value => {
	if (!value) {
		return value;
  }
  value = value.replace(/[()-]/g,'')
	return Number(value.replace(/[^\d]/g, ''));
}

const PhoneNumber = (props) => {
  let {onChange, ...rest} = props
  let changing = function (e) {
    let numData = e.target.value
    let enteredPhoneNumber = parseNumber(numData).toString()
    if (enteredPhoneNumber.length <= 10) {
      onChange(enteredPhoneNumber)
    }
  }
  // TODO cursor position only valid if less then length of 10
  // cursor position only works first character change
	return (
    <div>
      <label>Phone Number</label>
      <input type="text"
        {...rest}
        value={format_Phone(rest.value)}
        onChange={changing}>
      </input>
    </div>
  )
}




export const parseNumber = parse_Number;

export default PhoneNumber;
