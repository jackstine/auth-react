import {UserHOC} from '../store/contexts/UserContext'
import UserUpdateForm from '../components/user/UserUpdateForm'
import { NavLink } from 'react-router-dom'
import {ROUTES} from '../router'

const UserP = function (props) {
  let user = props.user.state
  return (
    <div>
      <h1>{`Hello ${user.first_name} ${user.last_name}`}</h1>
      <NavLink to={ROUTES.PLANS}>PLANS</NavLink>
      <UserUpdateForm />
    </div>
  )
}

export default UserHOC(UserP)
