import WebAPI from "./WebAPI";
import config from "../config";

class CustomerAPI extends WebAPI {
  constructor() {
    super({ endpoint: config.API + "/customers" });
  }

  authorizeCustomer(user, product, price) {
    let customerPriceInfo = {
      user,
      product,
      price,
    };
    return this.__post("/authorize", customerPriceInfo, { auth: false });
  }

  authorizeCreateCustomer(user, customer, price) {
    return this.__post("/authorize/customer", { user, customer, price });
  }

  authorizeSale(sub, paymentMethod, customer) {
    return this.__post("/authorize/sale", { sub, paymentMethod, customer });
  }

  authorizeSource(customer, source) {
    return this.__post("/authorize/source", { customer, source });
  }

  getSources(customer) {
    return this.__get("/source", { id: customer.id });
  }

  getSubscriptions(customer_id) {
    return this.__get("/subscriptions", { id: customer_id });
  }

  cancelSubscription(sub_id) {
    return this.__delete("/subscriptions", { id: sub_id });
  }
}

export default CustomerAPI;
