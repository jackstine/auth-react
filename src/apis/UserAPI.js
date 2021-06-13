import WebAPI from "./WebAPI";
import config from "../config";

class UserAPI extends WebAPI {
  constructor() {
    super({ endpoint: config.API + "/user" });
  }
  createUser(user) {
    return this.__post("", { user }, { auth: false });
  }
  forgotPassword(email) {
    return this.__post("/password/forgot", { email }, { auth: false });
  }
  resetPasswordWithTemp(email, tempPassword, newPassword) {
    return this.__post(
      "/password/forgot/reset",
      { email, tempPassword, newPassword },
      { auth: false }
    );
  }
  verifyUser(verificationCode) {
    return this.__post("/verify", { verificationCode }, { auth: false });
  }
  updateUser(user) {
    return this.__put("", { user });
  }
}

export default UserAPI;
