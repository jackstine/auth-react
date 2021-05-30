import {useEffect, useState} from 'react'

const PasswordMustMatchField = function (props) {
  let {onChange, ...rest} = props
  let [real, setReal] = useState("")
  let [other, setOther] = useState("")
  let [match, setMatch] = useState(false)
  useEffect(() => {
    let m = real === other
    setMatch(m)
    if (m) {
      onChange(real)
    } else {
      onChange(undefined)
    }
  }, [real, other, onChange])
  let passwordError = 'The Passwords do not match'
  return (
    <>
      <div>
        <label>Password</label>
        <input onChange={(e) => {
          setReal(e.target.value)
        }} value={real} {...rest} />
      </div>
      <div>
        <label>Retype Password</label>
        <input onChange={(e) => setOther(e.target.value)} value={other} />
      </div>
      {!match && passwordError}
    </>
  )
}

export default PasswordMustMatchField
