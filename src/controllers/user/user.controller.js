// eslint-disable-next-line no-func-assign

import { logger, level } from '../../config/logger';
import { constants as APP_CONST } from '../../constant/application';
import { constants as API_URL } from '../../constant/api_url';
import { constants as SENDGRID_CONST } from '../../constant/sendgrid';
import sendGrid from '../../utils/sendGrid';
import { validationResult } from 'express-validator';
import { badRequestError, successResponse, serverError } from '../../utils/utility';
import * as userRepo from '../../repositories/user/user';

let { USER_EMAIL_VERIFICATION, USER_EMAIL_VERIFICATION_FAILED } = API_URL;

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  logger.log(level.debug, `>> registerUser()`);
  console.log(req.body);
  try {
    if (!errors.isEmpty()) {
      console.log(req.body);
      badRequestError(res, errors);
    } else {
      const inserteduser = await userRepo.addUser(req.body);
      await sendMailToUser(inserteduser);
      const data = {
        message: 'succ_1'
      };
      successResponse(res, data);
    }
  } catch (e) {
    logger.log(level.error, `<< registerUser error=${e}`);
    serverError(res);
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  logger.log(level.debug, `>> loginUser()`);
  logger.log(level.info, `>> loginUser body=${JSON.stringify(req.body)}`);

  try {
    if (!errors.isEmpty()) return badRequestError(res, errors);
    let { decryptPassword, object } = await userRepo.loginUser(req.body);
    if (decryptPassword) {
      successResponse(res, object);
    } else {
      badRequestError(res, 'err_13');
    }
  } catch (e) {
    logger.log(level.error, `<< loginUser error=${e}`);
    serverError(res);
  }
};

export const facebookLogIn = async (req, res) => {
  logger.log(level.info, `>> facebookLogin ()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      badRequestError(res, errors);
    } else {
      let facebookData = await userRepo.facebookLogIn(req.body);
      if (facebookData.error) return badRequestError(res, facebookData.message);
      successResponse(res, facebookData);
    }
  } catch (error) {
    logger.log(level.error, `<< facebookLogin Error = ${error}`);
    serverError(res);
  }
};

export const googleLogIn = async (req, res) => {
  logger.log(level.info, `>> googleLogIn ()`);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      badRequestError(res, errors);
    } else {
      let googleData = await userRepo.googleLogIn(req.body);
      if (googleData.error) return badRequestError(res, googleData.message);
      successResponse(res, googleData);
    }
  } catch (error) {
    logger.log(level.error, `<< googleLogIn Error =${error}`);
    serverError(res);
  }
};

export const forgotPassword = async (req, res) => {
  const errors = validationResult(req);
  logger.log(level.info, `>> forgotPassword ${JSON.stringify(req.params)}`);

  try {
    if (!errors.isEmpty()) return badRequestError(res, errors);
    const user = await userRepo.forgetPassword(req.params);

    let data = await sendForgetPasswordMail(user);
    successResponse(res, data);
  } catch (e) {
    logger.log(level.error, `<< forgotPassword ${JSON.stringify(req.params)}`);
    serverError(res);
  }
};

export const sendForgetPasswordMail = async (user) => {
  let { email, password_reset_token, password_reset_otp } = user;
  let passwordResetURL = APP_CONST.user_URL + '/auth/reset-password?token=' + password_reset_token;
  const msg = {
    to: email,
    from: SENDGRID_CONST.SENDGRID_FROM,
    templateId: SENDGRID_CONST.FORGET_TEMPLATE_ID,
    dynamic_template_data: {
      APP_USERNAME: email,
      FORGOT_PASSWORD: passwordResetURL,
      USE_TOKEN: password_reset_otp,
      APP_LOGO: APP_CONST.LOGO_URL
    }
  };

  sendGrid(msg);
  const data = {
    message: 'succ_3'
  };
  return data;
};

export const verifyUser = async (req, res) => {
  logger.log(level.debug, `>> verifyUser params=${JSON.stringify(req.params)}`);
  try {
    let userExist = await userRepo.verifyUserEmail(req.params);

    if (userExist) {
      await sendWelcomeMailToUser(userExist);
      return res.redirect(USER_EMAIL_VERIFICATION);
    } else {
      return res.redirect(USER_EMAIL_VERIFICATION_FAILED);
    }
  } catch (e) {
    logger.log(level.error, `<< verifyUser error=${e}`);
    serverError(res);
  }
};

export const changePassword = async (req, res) => {
  const errors = validationResult(req);
  logger.log(level.debug, `>> changePassword() `);
  try {
    if (!errors.isEmpty()) {
      badRequestError(res, errors);
    } else {
      await userRepo.changePassword(req.body);
      const data = {
        message: 'succ_4'
      };
      successResponse(res, data);
    }
  } catch (e) {
    logger.log(level.error, `<< changePassword ${JSON.stringify(e)}`);
    serverError(res);
  }
};

export const myAccount = async (req, res) => {
  logger.log(level.debug, `>> myAccount() `);
  const { user_id } = req.currentUser;
  try {
    let userAccount = await userRepo.userAccount(user_id);
    const data = {
      message: 'succ_6',
      data: userAccount
    };
    successResponse(res, data);
  } catch (e) {
    logger.log(level.error, `<< myAccount ${JSON.stringify(e)}`);
    serverError(res);
  }
};

export const updateMyAccount = async (req, res) => {
  const errors = validationResult(req);
  logger.log(level.debug, `>> updateMyAccount() `);
  const { user_id } = req.currentUser;
  const filteruser = { user_id, status: 1 };

  try {
    if (!errors.isEmpty()) return badRequestError(res, errors);

    logger.log(level.info, `>> updateMyAccount body=${JSON.stringify(req.body)}`);

    const updatedData = await userRepo.updateMyAccount(req.body, filteruser, req.files);
    if (updatedData.error) {
      return badRequestError(res, updatedData.message);
    }
    return successResponse(res, updatedData);
  } catch (e) {
    logger.log(level.error, `<< updateMyAccount ${JSON.stringify(e)}`);
    serverError(res);
  }
};

export const verifyOTP = async (req, res) => {
  logger.log(level.info, `>> verifyOTP `);
  logger.log(level.debug, `verifyOTP body=${JSON.stringify(req.body)}`);
  try {
    const userDoc = await userRepo.getUserData({ email: req.body.email });
    if (userDoc && !userDoc.isUser) return badRequestError(res, 'err_11');
    if (userDoc && userDoc.userData.status === 1) {
      if (userDoc.userData.status === 1) {
        let data = {
          message: 'succ_5'
        };
        return successResponse(res, data);
      }

      if (userDoc.userData.status === 2 || userDoc.userData.status === 3) {
        return badRequestError(res, 'err_15');
      }
    }

    let verifieduser = await userRepo.verifyUserOTP(req.body, userDoc.userData);

    if (verifieduser) {
      sendWelcomeMailToUser(userDoc.userData);
      let data = {
        message: 'succ_0'
      };
      return successResponse(res, data);
    } else {
      return badRequestError(res, 'err_0');
    }
  } catch (e) {
    logger.log(level.error, `<< verifyOTP error=${e}`);
    serverError(res);
  }
};

export const changePasswordOtp = async (req, res) => {
  const errors = validationResult(req);
  logger.log(level.info, `>> changePasswordOtp `);
  logger.log(level.debug, `>> changePasswordOtp body=${JSON.stringify(req.body)}`);
  try {
    if (!errors.isEmpty()) return badRequestError(res, errors);
    const userDoc = await userRepo.getUserData({ email: req.body.email });
    let changedPassword = await userRepo.resetPwdOTP(req.body, userDoc.userData);
    if (changedPassword) {
      const data = {
        message: 'succ_4'
      };
      return successResponse(res, data);
    } else {
      return badRequestError(res, 'err_0');
    }
  } catch (e) {
    logger.log(level.error, `<< changePasswordOtp error=${e}`);
    serverError(res);
  }
};

export const sendMailToUser = async (userData) => {
  let { email, verification_token, otp } = userData;
  // const from = SENDGRID_CONST.FROM;
  // const to = email;
  let emailVerificationURL =
    APP_CONST.HOST_URL + '/api/user/email_verification/' + verification_token;
  const msg = {
    to: email,
    from: SENDGRID_CONST.SENDGRID_FROM,
    templateId: SENDGRID_CONST.VERIFY_TEMPLATE_ID,
    dynamic_template_data: {
      VERIFY_LINK: emailVerificationURL,
      USE_TOKEN: otp,
      APP_USERNAME: email,
      ATV_LOGO: APP_CONST.LOGO_URL
    }
  };

  sendGrid(msg);
};

const sendWelcomeMailToUser = async (user) => {
  const msg = {
    to: user.email,
    from: SENDGRID_CONST.SENDGRID_FROM,
    templateId: SENDGRID_CONST.WELCOME_TEMPLATE_ID,
    dynamic_template_data: {
      APP_USERNAME: user.email,
      ATV_LOGO: APP_CONST.LOGO_URL
    }
  };
  sendGrid(msg);
};

/**
 * from body take email and otp
 * encrypt email
 * query if email and otp exist
 * check if user is verified or not
 * if not verified then update user account to verify and send back JWT token
 */

/**
 * Register User in mob/web
 * if web just send verification email
 * if app just send otp in email
 * verify otp api :-  query with encrypt(mail) and otp if verified than sendback token
 * In Login Api if user is not verified then send not verify code. in app user will redirect to otp screen.
 * that time alse mail also send with otp. and called same verify email above: query with encrypt(mail) and otp if verified than sendback token
 */
