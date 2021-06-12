import WebAPI from "./WebAPI";
import config from "../config";

class AuthAPI extends WebAPI {
  constructor() {
    super({ endpoint: config.API + "/auth" });
  }

  login(user) {
    return this.__post("/login", { user }, { auth: false });
  }

  verifyToken() {
    return this.__get("/token/verify", null);
  }

  googleSignIn(token) {
    return this.__post("/google", { token }, { auth: false });
  }
}

export default AuthAPI;
