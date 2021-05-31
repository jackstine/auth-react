import {useState} from 'react'
import SignIn from './SignIn'
import { useHistory } from 'react-router-dom'
import {ROUTES} from '../router'

const Header = function () {
  let [showSignIn, setShowSignIn] = useState(false)
  let history = useHistory()
  const handleSignIn = () => {
    setShowSignIn(true)
  }
  const handleSignUp = () => {
    history.push(ROUTES.CREATE_USER)
  }
  return (
    <div>
      {!showSignIn &&
        <div onClick={handleSignIn}>
          SIGN IN
        </div>
      }
      {
        <div onClick={handleSignUp}>
          SIGN UP
        </div>
      }
      {showSignIn && <SignIn />}
    </div>
  )
}

export default Header
