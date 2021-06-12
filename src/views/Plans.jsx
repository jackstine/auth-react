import React, { useEffect, useCallback, useState } from "react";
import ProductsAPI from "../apis/ProductAPI";
import Button from "@material-ui/core/Button";
import CustomerAPI from "../apis/CustomerAPI";
import { UserHOC } from "../store/contexts/UserContext";
import { useHistory } from "react-router";
import { ROUTES } from "../router";
import { SubHOC, SUB_ACTIONS } from "../store/contexts/SubscriptionContext";

const Plans = function (props) {
  let [products, setProducts] = useState([]);
  let [submitting, setSubmitting] = useState(false);
  let history = useHistory();
  let user = props.user.state;
  let dispatchSub = props.sub.dispatch;
  let handleSectedProduct = useCallback(
    (productPrice) => {
      setSubmitting(true);
      if (user) {
        let product = productPrice.product;
        // TODO need to make sure the prices is price, and not a Array
        let price = productPrice.prices[0];
        let newUser = { ...user };
        newUser.user_id = user.id;
        // TODO if there is an error you are out of luck
        new CustomerAPI()
          .authorizeCustomer(newUser, product, price)
          .then((sub) => {
            console.log(sub); // OUT
            if (sub.has_customer) {
              dispatchSub({
                type: SUB_ACTIONS.SUBSCRIPE_CUSTOMER_WITH_PRICE,
                state: {
                  price: price,
                  sub: sub.subscription,
                  customer: sub.customer,
                },
              });
            } else {
              dispatchSub({
                type: SUB_ACTIONS.ADD_PRICE,
                state: { price: price },
              });
            }
            history.push(ROUTES.CUSTOMER_PROFILE);
          });
      } else {
        // TODO later
        // TODO need to get the plan id information as well
        // got to Sign up page, create user, then be redirected to the
        // customer page --->>>
        history.push(ROUTES.SIGN_UP);
      }
    },
    [user, dispatchSub, history]
  );
  useEffect(() => {
    new ProductsAPI().getProducts().then((prods) => {
      setProducts(prods);
    });
  }, []);
  let ListProducts = products.map((el) => {
    return (
      <div key={el.prices[0].id}>
        <Button disabled={submitting} onClick={() => handleSectedProduct(el)}>
          {el.product.name}
        </Button>
        <label>Price: {el.prices[0].unit_amount}</label>
      </div>
    );
  });
  return <div>{ListProducts}</div>;
};

export default SubHOC(UserHOC(Plans));
