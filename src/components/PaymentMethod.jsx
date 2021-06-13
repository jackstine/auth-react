import Stripe from "../components/Stripe";
import { UserHOC } from "../store/contexts/UserContext";
import { SubHOC } from "../store/contexts/SubscriptionContext";
import { useEffect, useState } from "react";
import CustomerAPI from "../apis/CustomerAPI";

const PaymentMethod = function (props) {
  let sub = props.sub.state?.sub;
  let customer = props.sub.state.customer;
  let user = props.user.state;
  let [sources, setSources] = useState([]);
  useEffect(() => {
    let api = new CustomerAPI();
    api
      .getSources(customer)
      .then((resp) => {
        sources.push(resp);
        setSources([...sources]);
      })
      .catch((resp) => {
        // do nothing
      });
  }, []); // only needs to occur once
  let Cards = sources.map((el) => {
    return <div>{el.card.last4}</div>;
  });
  return (
    <div>
      <h1>Payment Method</h1>
      {Cards}
      <Stripe
        fullName={`${user.first_name} ${user.last_name}`}
        sub={sub}
        customer={props.sub.state.customer}
      />
    </div>
  );
};

export default UserHOC(SubHOC(PaymentMethod));
