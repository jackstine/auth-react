import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import config from '../config'
import CustomerAPI from '../apis/CustomerAPI'

/**
 * 1. User selects the plan that they want
 * 2. check 
 * So a user will create information for the customer
 * Then we will 
 */

/**
 * Pass the client secret to the Front End and then we need 
 * 
 * @returns 
 */

 const stripePromise = loadStripe(config.stripKey);

const CardLayout = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    stripe.confirmCardPayment(props.sub.latest_invoice.payment_intent.client_secret,{
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: props.fullName,
        }
      }
    }).then(resp => {
      console.log(resp)
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

/**
 * 
 * @param {sub} props 
 * @param {fullName}
 * @returns 
 */
const StripeComponent = function (props) {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CardLayout {...props}/>
      </Elements>
    </div>
  )
}


export default StripeComponent
