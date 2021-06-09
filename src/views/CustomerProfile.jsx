import CustomerForm from '../components/CustomerForm'
import {SubHOC} from '../store/contexts/SubscriptionContext'
import PaymentMethod from '../components/PaymentMethod'

const CustomerProfile = function (props) {
  let sub = props.sub.state
  let hasPrice = sub.price
  let hasCustomer = sub.customer
  
  return (
    <>
      {hasPrice && !hasCustomer && <CustomerForm/>}
      {hasPrice && hasCustomer &&  <PaymentMethod/>}
    </>
  )
}

export default SubHOC(CustomerProfile)
