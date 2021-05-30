import {useState} from 'react'
import SignIn from './SignIn'

const Header = function () {
  let [showSignIn, setShowSignIn] = useState(false)
  const handleSignIn = () => {
    setShowSignIn(true)
  }
  return (
    <div>
      {!showSignIn &&
        <div onClick={handleSignIn}>
          SIGN IN
        </div>
      }
      {showSignIn && <SignIn />}
    </div>
  )
}

export default Header
