import { Form, Formik } from "formik"
import TextBox from '../common-components/Fields/TextBox'
import SubmitButton from '../common-components/buttons/SubmitButton'
import CustomerAPI from '../apis/CustomerAPI'
import {UserHOC} from '../store/contexts/UserContext'
import {SubHOC, SUB_ACTIONS} from '../store/contexts/SubscriptionContext'

const DEFAULT_CUSTOMER_VALUES = {
  city: 'Atlanta',
  country: 'us',
  line1: '261 7th Street',
  line2: '21 Apt',
  postal_code: '30309'
}

// TODO make sure that the user has an authenticated user
const CustomerForm = function (props) {
  return (
    <Formik initialValues={DEFAULT_CUSTOMER_VALUES}
    onSubmit={(values, actions) => {
      let user = props.user.state
      let price = props.sub.state.price
      let subDispatch = props.sub.dispatch
      if (user) {
        let api = new CustomerAPI()
        api.authorizeCreateCustomer(user, {billing: values}, price).then(customerSub => {
          subDispatch({state: {...customerSub}, action: SUB_ACTIONS.SUBSCRIPE_CUSTOMER})
          // currently this will automatically switch over to the Payment Method
        })
      }
    }}
    >
      {(formikProps) => (
        // TODO make sure that this is the billing address
        <Form>
          <TextBox name="line1" label="Addres Line 1"/>
          <TextBox name="line2" label="Address Line 2"/>
          <TextBox name="postal_code" type="number" label="Zip Code"/>
          <TextBox name="city" label="city" />
          {/* TODO Need Select for State */}
          {/* TODO Need Select for Country */}
          <SubmitButton disabled={formikProps.isSubmitting}/>
        </Form>
      )}
    </Formik>
  )
}

export default SubHOC(UserHOC(CustomerForm))
