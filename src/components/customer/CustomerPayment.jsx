import CustomerForm from "../CustomerForm";
import { SubHOC } from "../../store/contexts/SubscriptionContext";
import PaymentMethod from "../PaymentMethod";
import { useState } from "react";

const CustomerPayment = function (props) {
  let sub = props.sub?.state;
  let hasPrice = sub?.price;
  let hasCustomer = sub?.customer;
  let [moveToPaymentMethod, setPaymentMethod] = useState();
  let onAC = function () {
    setPaymentMethod(true);
  };
  return (
    <>
      {hasPrice && !hasCustomer && <CustomerForm authorizedCustomer={onAC} />}
      {(moveToPaymentMethod || (hasPrice && hasCustomer)) && <PaymentMethod />}
    </>
  );
};

export default SubHOC(CustomerPayment);
