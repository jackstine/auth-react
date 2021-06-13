import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import config from "../config";
import StripeAPI from "../appLogic/stripe/StripeAPI";
import Checkbox from "@material-ui/core/Checkbox";
import { useState } from "react";
import CustomerAPI from "../apis/CustomerAPI";

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
  const [rememberCard, setRememberCard] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    let source = null;
    if (rememberCard) {
      source = await StripeAPI.createSource(stripe, props.full_name, elements).then((resp) => {
        let api = new CustomerAPI();
        return api.authorizeSource(props.customer, resp.source);
      });
    }
    let client_secret = props.sub.latest_invoice.payment_intent.client_secret;
    StripeAPI.confirmPayment(stripe, client_secret, props.full_name, elements).then((resp) => {
      console.log(resp);
      let status = resp.paymentIntent.status;
      if (status === "succeeded") {
        // LATER
        // return to the user page, show a status with green saying
        // Successfully made payment, you are upgraded.
      } else {
        // LATER
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <label>Remember Card for future Transactions</label>
      <Checkbox onChange={(e) => setRememberCard(e.target.checked)} checked={rememberCard} />
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
        <CardLayout {...props} />
      </Elements>
    </div>
  );
};

export default StripeComponent;
