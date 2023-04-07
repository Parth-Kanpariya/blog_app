/**
 * User Routes
 */
// eslint-disable-next-line no-func-assign

import { Router } from "express";
import * as userCtrl from "../../controllers/user/user.controller";

import { appAuthMiddleware } from "../../middleware/authentication";
import { validate } from "../../validator/user.validator";
import { constants as VALIDATOR } from "../../constant/validator/user.js";

const routes = new Router({ mergeParams: true });

const PATH = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  VERIFY_EMAIL: "/email_verification/:verification_token",
  VERIFY_USER: "/verification",
  FORGOT_PASSWORD: "/forgot_password/email/:email",
  CHANGE_PASSWORD: "/change_password",
  CHANGE_PASSWORD_OTP: "/change_password_otp",
  SEND_VERIFICATION: "/send_email_verification/:email",
  MY_ACCOUNT: "/me",
  ACCOUNT: "/account",
  PROFILE: "/profile",
  FACEBOOK: "/facebook",
  GOOGLE: "/google",
  ROOT: "/",
};

/**
 * @api {POST} /api/user/signup
 * @desc New User Register API
 * @access Public
 * **/
routes.post(
  PATH.SIGNUP,
  validate(VALIDATOR.REGISTER_USER),
  userCtrl.registerUser
);

/**
 * @api {POST} /api/user/login
 * @desc User Login API
 * @access Public
 * **/
routes.post(PATH.LOGIN, validate(VALIDATOR.LOGIN_USER), userCtrl.loginUser);

/**
 * @api {GET} /api/user/email_verification/:verification_token
 * @desc User Email Verify API
 * @access Public
 * **/
routes.get(PATH.VERIFY_EMAIL, userCtrl.verifyUser);

/**
 * @api {POST} /api/user/verification
 * @desc  ADMIN Verify using OTP API
 * @access Public
 * **/
routes.post(PATH.VERIFY_USER, userCtrl.verifyOTP);

/**
 * @api {GET} /api/user/forgot_password/email/:email
 * @desc User Forget Password API
 * @access Public
 * **/
routes.get(
  PATH.FORGOT_PASSWORD,
  validate(VALIDATOR.FORGOT_PASSWORD),
  userCtrl.forgotPassword
);

/**
 * @api {POST} /api/user/change_password
 * @desc User Reset Password API
 * @access Public
 * **/
routes.post(
  PATH.CHANGE_PASSWORD,
  validate(VALIDATOR.CHANGE_PASSWORD),
  userCtrl.changePassword
);

/**
 * @api {POST} /api/user/change_password_otp
 * @desc USER RESET Password API from app
 * @access Public
 * **/
routes.post(
  PATH.CHANGE_PASSWORD_OTP,
  validate(VALIDATOR.CHANGE_PASSWORD_OTP),
  userCtrl.changePasswordOtp
);

/**
 * @api {POST} /api/user/facebook
 * @desc Log In with Facebook API
 * @access Public
 * **/
routes.post(PATH.FACEBOOK, userCtrl.facebookLogIn);

/**
 * @api {POST} /api/user/google
 * @desc Log In with Google API
 * @access Public
 * **/
routes.post(PATH.GOOGLE, userCtrl.googleLogIn);

// /**
//  * @api {GET} /api/user/email_verification/:email
//  * @desc Resend verifiaction Mail
//  * @access Public
//  * **/

// routes.get(
//   PATH.SEND_VERIFICATION,
//   validate(VALIDATOR.SEND_VERIFICATION),
//   resendVerificationMail
// );

routes.use(appAuthMiddleware);

routes
  .route(PATH.MY_ACCOUNT)

  /**
   * @api {GET} /api/user/me
   * @desc Get my cart
   * @access Private
   * **/
  .get(userCtrl.myAccount)

  /**
   * @api {PUT} /api/user/edit_profile
   * @desc update user
   * @access Private
   * **/
  .put(userCtrl.updateMyAccount);

export default routes;
