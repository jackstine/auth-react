import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import config from '../config'

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

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let clientSecret = '' //
    stripe.confirmCardPayment(clientSecret, {
      card: elements.getElement(CardElement),
      billing_details: {
        name: ''
      }
    })
    let paymentMethod = '' //
    let error = '' //
    console.log(error, paymentMethod)
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

const stripePromise = loadStripe(config.stripKey);

const StripeComponent = () => (
  <div>
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </div>
);

export default StripeComponent
