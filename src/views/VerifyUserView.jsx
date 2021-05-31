import { useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import {capitalize} from '../common/U_F'
import UserAPI from '../apis/UserAPI'
import { useState } from 'react'

const VerifyUserView = function () {
  let location = useLocation()
  let query = new URLSearchParams(location.search)
  let firstName = capitalize(query.get('firstName'))
  let lastName = capitalize(query.get('lastName'))
  let verificationCode = query.get('verify')
  let [userHasBeenVerified, setUserHasBeenVerified] = useState(false)
  useEffect(() => {
    new UserAPI().verifyUser(verificationCode).then(resp => {
      if (resp.verified) {
        setUserHasBeenVerified(resp.verified)
      }
    })
  }, [verificationCode])
  let Message = <h1>`Thank you ${firstName} ${lastName}, you have been verified!`</h1>
  // TODO add a link to Log Into the application
  return (
    <div>
      {userHasBeenVerified && Message }
    </div>
  )
}

export default VerifyUserView
