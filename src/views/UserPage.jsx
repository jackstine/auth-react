import {UserConsumer} from '../store/contexts/UserContext'
import UserUpdateForm from '../components/user/UserUpdateForm'

const UserP = function (props) {
  let user = props.user.state
  return (
    <div>
      <h1>{`Hello ${user.first_name} ${user.last_name}`}</h1>
      <UserUpdateForm />
  </div>
  )
}

const UserPage = function () {
  return (
    <UserConsumer>
      {(user) => {
        return <UserP user={user}/>
      }}
    </UserConsumer>
  )
}

export default UserPage
