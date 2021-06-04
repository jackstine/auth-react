import { useState } from "react"
import ForgotPassword from "../components/ForgotPassword"
import {UserConsumer} from '../store/contexts/UserContext'
import LogInWithUserInfo from '../components/login/LogInWithUserInfo'
import CreateNewPassword from '../components/login/CreateNewPassword'

const SignIn = function () {
  let [showRetypePassword, setShowRetypePassword] = useState(false)
  let [tempPass, setTempPass] = useState({})
  const handleTempPassword = function (tempPassInfo) {
    setShowRetypePassword(true)
    setTempPass(tempPassInfo)
  }
  return (
    <UserConsumer>
      {(user) => {
        return (
          <div>
            {!showRetypePassword && 
              <LogInWithUserInfo
                user={user}
                onTempPasswordReceived={handleTempPassword} 
              />
            }
            {showRetypePassword && 
              <CreateNewPassword tempPass={tempPass} user={user} />
            }
          </div>
        )
      }}
    </UserConsumer>
  )
}

const SignInForm = function (props) {
  let [showForgotPassword, setShowForgotPassword] = useState(false)
  const handleForgotPassword = () => {
    setShowForgotPassword(true)
  }
  return (
    <div>
      {!showForgotPassword && 
        <div>
          <SignIn handleForgotPassword={handleForgotPassword} />
          <div onClick={handleForgotPassword}>Forgot password</div>
        </div>
      }
      {showForgotPassword &&
        <ForgotPassword />
      }
    </div>
  )
}

export default SignInForm
