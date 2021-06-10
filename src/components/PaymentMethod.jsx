import Stripe from '../components/Stripe'
import {UserHOC} from '../store/contexts/UserContext'
import {SubHOC} from '../store/contexts/SubscriptionContext'

const PaymentMethod = function (props) {
  let sub = props.sub.state?.sub
  let user = props.user.state
  return (
    <div>
      <h1>Payment Method</h1>
      <Stripe fullName={`${user.first_name} ${user.last_name}`} sub={sub} customer={props.sub.state.customer}/>
    </div>
  )
}


export default UserHOC(SubHOC(PaymentMethod))
