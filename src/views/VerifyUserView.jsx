import { useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import {capitalize} from '../common/U_F'

const VerifyUserView = function () {
  let location = useLocation()
  let query = new URLSearchParams(location.search)
  let firstName = capitalize(query.get('firstName'))
  let lastName = capitalize(query.get('lastName'))
  let verificationCode = query.get('verify')
  useEffect(() => {
    console.log('Verified')
    // TODO add in ther Verify API
  }, [verificationCode])
  let message = `Thank you ${firstName} ${lastName}, you have been verified!`
  return (<h1>{message}</h1>)
}

export default VerifyUserView
