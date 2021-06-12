import { CardElement } from "@stripe/react-stripe-js";

// this is on save payment method
// then we can have another button to Pay for the Item.
// a source can be used to pay for an item, or it can be saved with the customer

const CardTransactions = {
  createSource: function (stripe, full_name, elements) {
    return stripe.createSource(elements.getElement(CardElement), {
      type: "card",
      currency: "usd",
      owner: {
        name: full_name,
      },
    });
  },
  confirmPayment: function (stripe, client_secret, full_name, elements) {
    return stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: full_name,
        },
      },
    });
  },
};

export default CardTransactions;
