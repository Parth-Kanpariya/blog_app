/* eslint-disable no-unused-vars */
import jwt from "jsonwebtoken";
import { constants as JWT_CONST } from "../../constant/jwt_auth";
const SECRET = JWT_CONST.JWT_AUTH_SECRET;

class JWTAuth {
  async createToken(data, rememberMe) {
    return new Promise((resolve, reject) => {
      const payload = { data };
   
      try {
        const token = Promise.resolve(
          jwt.sign(payload, SECRET, {
            expiresIn: rememberMe === true ? "30d" : "24h",
            // expiresIn: "30d",
          })
        );
        resolve(token);
      } catch (err) {
        reject(err);
      }
    });
  }

  async verifyToken(accessToken) {
    return new Promise((resolve, reject) => {
      try {
        const decoded = jwt.verify(accessToken, SECRET);
        resolve(decoded);
      } catch (err) {
        reject(err);
      }
    });
  }
}
export default JWTAuth;
