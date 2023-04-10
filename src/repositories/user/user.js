import crypto from 'crypto';
import { encrypt, decrypt, orderOTPGenerator } from '../../utils/utility';
import userModel from '../../models/user';
import { logger, level } from '../../config/logger';
import { sendMailToUser } from '../../controllers/user/user.controller';
import JWTAuth from '../../services/jwt_auth/jwt_auth';
import _ from 'lodash';
import { constants as APP_CONST } from '../../constant/application';

export const getUserData = async (filter = {}) => {
  let userData = await userModel.get(filter);
  let data = {};
  let isUser = false;

  if (userData && userData.length > 0) {
    isUser = true;
    userData = userData[0];
    data = { userData, isUser };
  } else {
    data = { isUser };
  }
  return data;
};

export const verifyUserOTP = async (body, userDoc) => {
  logger.log(level.info, `>> verifyUserOTP `);
  let { otp, email } = body;

  if (userDoc && userDoc.otp && userDoc.otp === otp) {
    const tokenFilter = { email, otp };
    const updateUserFields = {
      status: 1
    };
    const removeFields = { verification_token: '', otp: '' };
    await userModel.update(tokenFilter, {
      $set: updateUserFields,
      $unset: removeFields
    });
    return true;
  } else {
    return false;
  }
};

export const addUser = async (body) => {
  logger.log(level.info, `>> addUser body=${JSON.stringify(body)}`);
  const encryptPassword = await encrypt(body.password);
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const otp = orderOTPGenerator();
  const admin = await userModel.add({
    ...body,
    password: encryptPassword,
    verification_token: verificationToken,
    otp
  });
  return admin;
};

export const verifyUserEmail = async (params) => {
  logger.log(level.info, `>> verifyUserEmail params=${JSON.stringify(params)}`);
  const verificationToken = params.verification_token;
  const tokenFilter = { verification_token: verificationToken };
  let adminDoc = await userModel.isExist(tokenFilter);
  if (adminDoc) {
    // const newVerificationToken = crypto.randomBytes(32).toString('hex');
    const updateUserFields = {
      //   verification_token: newVerificationToken,
      status: 1
    };

    const removeFields = { verification_token: '', otp: '' };
    let user = await userModel.update(tokenFilter, {
      $set: updateUserFields,
      $unset: removeFields
    });
    return user;
  }
  return false;
};

export const loginUser = async (body) => {
  let object;
  let { email, password } = body;

  const [adminDoc] = await userModel.get({
    email
  });

  const decryptPassword = await decrypt(password, adminDoc.password);
  if (decryptPassword) {
    const tokenPayload = {
      id: adminDoc._id,
      admin_id: adminDoc.admin_id,
      email: adminDoc.email
    };
    const auth = new JWTAuth();
    const accessToken = await auth.createToken(tokenPayload);

    let payload = {
      ...tokenPayload,
      accessToken,
      user_id: adminDoc.user_id
    };

    object = {
      message: 'succ_2',
      data: payload
    };
  }
  let data = { object, decryptPassword };
  return data;
};

export const facebookLogIn = async (body) => {
  let { email, firstname, lastname, profile_image } = body;

  let data = {};
  const isEmailExist = await userModel.isExist({
    email
  });
  if (isEmailExist) {
    const [userDoc] = await userModel.get({ email });
    if (userDoc.oauth_provider === 'local' || userDoc.oauth_provider === 'google') {
      data = {
        error: true,
        message: 'err_10'
      };
      return data;
    }
    const auth = new JWTAuth();
    const tokenPayload = {
      id: userDoc._id,
      email: userDoc.email
    };

    const accessToken = await auth.createToken(tokenPayload);
    logger.log(level.debug, `successfull addUser email = ${email} jwt token =${accessToken}`);
    data = {
      error: false,
      message: 'succ_2',
      data: {
        ...tokenPayload,
        accessToken
      }
    };
    return data;
  } else {
    const insertedUser = await userModel.add({
      email,
      firstname,
      lastname,
      profile_image,
      oauth_provider: 'facebook',
      status: 1
    });

    logger.log(level.debug, `>> insertedUser = ${insertedUser}`);
    const auth = new JWTAuth();
    const tokenPayload = {
      id: insertedUser._id,
      email: insertedUser.email
    };
    const accessToken = await auth.createToken(tokenPayload);
    logger.log(level.debug, `successfull addUser email = ${email} jwt token = ${accessToken}`);
    data = {
      error: false,
      message: 'succ_2',
      data: {
        ...tokenPayload,
        accessToken
      }
    };
    return data;
  }
};

export const googleLogIn = async (body) => {
  let { email, firstname, lastname, profile_image } = body;
  let data = {};

  const isEmailExist = await userModel.isExist({
    email
  });

  if (isEmailExist) {
    const [userDoc] = await userModel.get({ email });

    if (userDoc.oauth_provider === 'local' || userDoc.oauth_provider === 'facebook') {
      data = {
        error: true,
        message: 'err_10'
      };
      return data;
    }

    const auth = new JWTAuth();
    const tokenPayload = {
      id: userDoc._id,
      email: userDoc.email
    };

    const accessToken = await auth.createToken(tokenPayload);
    logger.log(level.debug, `successfull addUser email = ${email} jwt token = ${accessToken}`);
    data = {
      error: false,
      message: 'succ_2',
      data: {
        ...tokenPayload,
        accessToken
      }
    };
    return data;
  } else {
    const insertedUser = await userModel.add({
      email,
      firstname,
      lastname,
      profile_image,
      oauth_provider: 'google',
      status: 1
    });
    logger.log(level.debug, `>> insertedUser= ${insertedUser}`);

    const auth = new JWTAuth();
    const tokenPayload = {
      id: insertedUser._id,
      email: insertedUser.email
    };
    const accessToken = await auth.createToken(tokenPayload);
    logger.log(level.debug, `successfull addUser email= ${email} jwt token = ${accessToken}`);
    data = {
      error: false,
      message: 'succ_2',
      data: {
        ...tokenPayload,
        accessToken
      }
    };

    return data;
  }
};

export const sendVerificationEmail = async (email) => {
  const newVerificationToken = crypto.randomBytes(32).toString('hex');
  const otp = orderOTPGenerator();
  const updateUserField = {
    verification_token: newVerificationToken,
    otp,
    verify: false
  };
  const updatedUser = await userModel.update({ email }, updateUserField);
  logger.log(level.info, `>> sendVerificationEmail updatedUser=${updatedUser}`);

  sendMailToUser(updatedUser);

  throw new Error('err_12');
};

export const forgetPassword = async (params) => {
  let { email } = params;
  const token = crypto.randomBytes(32).toString('hex');
  let password_reset_otp = orderOTPGenerator();
  const updateToken = { password_reset_token: token, password_reset_otp };
  const updateUser = await userModel.update({ email }, updateToken);
  return updateUser;
};

export const changePassword = async (body) => {
  const { newPassword, token } = body;
  const tokenFilter = { password_reset_token: token };
  const encryptPassword = await encrypt(newPassword);
  const updatePassword = {
    password: encryptPassword
  };
  let removeField = { password_reset_token: '', password_reset_otp: '' };
  const updatedUser = await userModel.update(tokenFilter, {
    $set: updatePassword,
    $unset: removeField
  });
  return updatedUser;
};

export const resetPwdOTP = async (body, adminDoc) => {
  const { email, newPassword, password_reset_otp } = body;
  if (
    adminDoc &&
    adminDoc.password_reset_otp &&
    adminDoc.password_reset_otp === password_reset_otp
  ) {
    const tokenFilter = { password_reset_otp, email };
    const encryptPassword = await encrypt(newPassword);
    const updatePassword = {
      password: encryptPassword
    };
    let removeField = { password_reset_token: '', password_reset_otp: '' };
    await userModel.update(tokenFilter, {
      $set: updatePassword,
      $unset: removeField
    });
    return true;
  } else {
    return false;
  }
};

export const userAccount = async (userId) => {
  let excludedFields =
    '-password_reset_token -role -verify -is_active -password -is_deleted -verification_token -created_at -updated_at -__v';

  let [getMyAccount] = await userModel.get({ user_id: userId, status: 1 }, excludedFields);

  logger.log(level.debug, `>> adminAccount account data ${JSON.stringify(getMyAccount)} `);

  return getMyAccount;
};

export const updateAccount = async (filter, updateData) => {
  updateData = _.pickBy(updateData);
  let updatedUser = await userModel.update(filter, {
    $set: updateData
  });

  return updatedUser;
};

export const updateMyAccount = async (body, filterUser, files) => {
  logger.log(level.info, `<< updateMyAccount`);
  const { firstname, lastname, country, country_code, phone_number, oldPassword, newPassword } =
    body;

  let { isUser, userData } = await getUserData(filterUser);
  if (isUser) {
    let updateMyAccountData = {
      firstname,
      lastname,
      phone_number,
      country,
      country_code
    };

    if (files) {
      if (files.profile_image) {
        let fileDoc = files.profile_image;
        files.profile_image.mv(APP_CONST.PROFILE_PATH + `/profile-image-${fileDoc.name}`);
        let url = 'http://localhost:3000' + '/static' + `/profile-image-${fileDoc.name}`;
        updateMyAccountData.profile_image = url;
      }
    }

    //! uncomment below code for aws image storage
    // if (req.files) {
    //   if (req.files.profile_image) {
    //     let fileDoc = req.files.profile_image;
    //     let url = await uploadFile(
    //       AWS_BUCKET_CONST.BUCKET_user,
    //       fileDoc.data,
    //       `profile-image-${fileDoc.name}`
    //     );
    //     updateMyAccountData.profile_image = url;
    //   }
    // }
    //! uncomment above code for aws image storage

    // if (email !== userDoc.email) {
    //   logger.log(level.debug, `>> updateMyAccount changeEmail`);
    //   const isEmailExist = await storeOwnerModel.isExist({
    //     email,
    //   });

    //   if (!isEmailExist) {
    //     logger.log(level.debug, `>> updateMyAccount newEmail=${email}`);
    //     const verificationToken = crypto.randomBytes(3).toString('hex');
    //     const newEmail = email;
    //     const verify = false;
    //     updateMyAccountData.verification_token = verificationToken;
    //     updateMyAccountData.email = newEmail;
    //     updateMyAccountData.verify = verify;
    //   } else {
    //     throw 'This email is already registered.';
    //   }
    // }

    if (oldPassword && newPassword) {
      logger.log(level.debug, `>> updateMyAccount changePassword`);
      const isOldPasswordMatch = await decrypt(oldPassword, userData.password);

      if (isOldPasswordMatch) {
        const newStoreOwnerPassword = await encrypt(newPassword);
        updateMyAccountData.password = newStoreOwnerPassword;
      } else {
        const data = {
          error: false,
          message: 'err_19'
        };
        return data;
      }
    }

    let updateduserData = await updateAccount(filterUser, updateMyAccountData);
    // if (!updateduser.verify) sendMailToUser(email, updateduser);

    logger.log(level.info, `>> updateMyAccount=${JSON.stringify(updateduserData)}`);
    const data = {
      error: false,
      message: 'succ_7',
      data: updateduserData
    };

    return data;
  } else {
    const data = {
      error: true,
      message: 'err_11'
    };
    return data;
  }
};
