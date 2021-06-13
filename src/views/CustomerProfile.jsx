import { Route, Switch } from "react-router";
import { ROUTES } from "../router";
import CustomerDrawer from "../components/customer/CustomerDrawer";
import CustomerPayment from "../components/customer/CustomerPayment";
import CustomerSubscriptions from "../components/customer/CustomerSubscriptions";

const CustomerProfile = function () {
  // TODO add in logic for when to show the Customer Drawer and when not to
  return (
    <>
      <CustomerDrawer />
      <Switch>
        <Route exact path={ROUTES.CUSTOMER_PROFILE} component={CustomerPayment} />
        <Route exact path={ROUTES.CUSTOMER_SUBSCRIPTIONS} component={CustomerSubscriptions} />
      </Switch>
    </>
  );
};

export default CustomerProfile;
