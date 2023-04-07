import { level, logger } from "../../config/logger";

export const errorMessageFunction = (errorCodeMessage) => {
  let errorMessage = "Something went wrong";

  errorsArray.filter((error) => {
    if (error.code === errorCodeMessage) {
      errorMessage = error.message;
      return errorMessage;
    }
    return "Something went wrong";
  });
  return errorMessage;
};

const errorsArray = [
  // ? Auth errors
  { code: "err_001", message: "Admin secret is wrong" },
  { code: "err_0", message: "Please Enter Correct Code" },
  { code: "err_1", message: "First name is required" },
  { code: "err_2", message: "Last name is required" },
  { code: "err_3", message: "Please provide a valid secret" },
  { code: "err_4", message: "Phone Number is required" },
  { code: "err_5", message: "Country is required" },
  { code: "err_6", message: "Country code is required" },
  { code: "err_7", message: "Invalid email address" },
  {
    code: "err_8",
    message: "Password must be at least 8 characters in length",
  },
  { code: "err_9", message: "Password does not match" },
  { code: "err_10", message: "This email is already registered" },
  { code: "err_11", message: "User does not belong to any account" },
  {
    code: "err_12",
    message:
      "Your account is not verified, We have send new verification code to your email address. Please check your inbox.",
  },
  { code: "err_13", message: "Invalid email or password" },
  { code: "err_14", message: "Your account is deleted" },
  {
    code: "err_15",
    message: "Your account is deactivated please contact admin",
  },
  { code: "err_16", message: "Please login with google account" },
  { code: "err_17", message: "Please login with facebook account" },
  { code: "err_18", message: "Password reset token is not valid" },
  { code: "err_19", message: "Old password does not match" },
  {
    code: "err_20",
    message: "New Password and Confirm Password does not match",
  },

  // ? URL short errors
  { code: "err_21", message: "Long Url is required" },
  { code: "err_22", message: "Something went wrong while fetching short url" },
  { code: "err_23", message: "Short Url is invalid" },
  { code: "err_24", message: "Short Url code is required" },
  { code: "err_25", message: "Short Code not found" },
  { code: "err_26", message: "Custom code already exist" },
  { code: "err_27", message: "Short Code is required" },
  { code: "err_28", message: "The Link format is invalid" },
  {
    code: "err_29",
    message: "Alias length must be at least 4 characters",
  },
  {
    code: "err_29_1",
    message: "Alias length should not be greater than 15 characters",
  },
  { code: "err_30", message: "Url is expired" },

  // ? Coupons errors
  { code: "err_31", message: "Coupon name is required" },
  { code: "err_32", message: "Reference name is required" },
  { code: "err_33", message: "Number of coupon is required" },
  { code: "err_34", message: "Valid till date is required" },
  {
    code: "err_35",
    message: "Valid till date must be greater than today date",
  },
  { code: "err_36", message: "Expiration date is required" },
  { code: "err_37", message: "Expire date must be greater than today date" },
  { code: "err_38", message: "Coupon code not found" },
  { code: "err_39", message: "You can not delete this coupon" },
  { code: "err_40", message: "Coupon Id is required" },
  { code: "err_41", message: "Coupon not found" },
  { code: "err_42", message: "All Fields are required" },
  { code: "err_43", message: "Coupon is expired" },
  { code: "err_44", message: "You don't have enough reseller limit" },
  { code: "err_45", message: "Reseller is required" },
  { code: "err_46", message: "Number of coupon must be less than 15" },
  { code: "err_47", message: "You can not apply own coupon" },

  // ? Space error
  { code: "err_51", message: "Space name is required" },
  { code: "err_52", message: "Space Color is required" },
  { code: "err_53", message: "Space already exist" },
  { code: "err_54", message: "Space does not exist" },
  { code: "err_55", message: "Space Id is required" },

  // ? Config error
  { code: "err_61", message: "Config Package already exist" },
  { code: "err_62", message: "Package name is required" },
  { code: "err_63", message: "Maximum url limit is required" },
  { code: "err_64", message: "Maximum domain limit is required" },
  { code: "err_65", message: "Maximum Space limit is required" },
  { code: "err_66", message: "Advance Statistics is required" },
  { code: "err_67", message: "Link Password is required" },
  { code: "err_68", message: "Link expiration is required" },
  { code: "err_69", message: "Link deactivation is required" },
  { code: "err_70", message: "Data export is required" },
  { code: "err_71", message: "Config buy Package already exist" },
  { code: "err_72", message: "Title is required" },
  { code: "err_73", message: "Description is required" },
  { code: "err_74", message: "Url is required" },
  { code: "err_75", message: "Please contact admin" },
  { code: "err_76", message: "Config buy package id is required" },
  { code: "err_77", message: "Config buy package not found" },
  { code: "err_78", message: "Config domain is required" },
  { code: "err_79", message: "Config domain is required" },
  { code: "err_80", message: "Config domain not found" },

  // ?  User Active Package error
  { code: "err_81", message: "You don't have any active package" },
  { code: "err_82", message: "Package is expired" },
  { code: "err_83", message: "You don't have enough remaining urls" },
  { code: "err_84", message: "You don't have enough remaining space" },
  { code: "err_85", message: "Applying coupon is not eligible" },
  { code: "err_86", message: "Coupon code is required" },
  { code: "err_87", message: "You don't have enough remaining domains" },
  { code: "err_88", message: "You don't have link expiration feature" },
  { code: "err_89", message: "You don't have link deactivation feature" },
  { code: "err_90", message: "You don't have link password feature" },

  // ? Domain errors
  { code: "err_91", message: "Domain is not valid" },
  { code: "err_92", message: "Domain not found" },
  { code: "err_93", message: "Domain is required" },
  { code: "err_94", message: "Domain is required" },
  { code: "err_95", message: "You can not delete this domain" },
  { code: "err_96", message: "Domain already used by other user" },
  {
    code: "err_109",
    message:
      "Your domain status is unverified. So you can't set domain as a primary",
  },
  {
    code: "err_110",
    message: "You cannot add this domain",
  },

  // ? Other errors

  { code: "err_101", message: "You don't have enough permission" },
  { code: "err_102", message: "First set config" },
  { code: "err_103", message: "Config domain already exist" },
  { code: "err_104", message: "Password does not matched" },
  { code: "err_105", message: "Status is required" },
  { code: "err_106", message: "User id is required" },
  { code: "err_107", message: "User active package id is required" },

  { code: "err_111", message: "CSV File is required" },
  { code: "err_112", message: "Bulk name already exist" },
  { code: "err_113", message: "Bulk not found" },
  { code: "err_114", message: "CSV file is not valid" },
  {
    code: "err_115",
    message: "You can not delete this bulk, It has active urls",
  },
  { code: "err_116", message: "You don't have service to create bulk" },
  { code: "err_117", message: "You don't have service for UTM" },
  { code: "err_118", message: "You can not short URL" },
  { code: "err_119", message: "App user id is required" },
  { code: "err_120", message: "You can short 250 links at once" },

  // ? blocked domain error
  { code: "err_121", message: "Block Domain is required" },
  { code: "err_122", message: "Block Domain is required" },
  { code: "err_123", message: "Block Domain not found" },
  { code: "err_124", message: "You can not edit blocked urls" },
  {
    code: "err_125",
    message:
      "This urls domain in blocked by admin, You can not create this url",
  },
  { code: "err_126", message: "Block Domain already exist" },

  // ? advertisement error
  { code: "err_127", message: "Config for ads not found" },
  { code: "err_128", message: "Time hold in seconds is required" },
  { code: "err_129", message: "Config advertisement id is required" },
  { code: "err_130", message: "User not found" },
  { code: "err_131", message: "Access denied by admin" },
  { code: "err_132", message: "App Id is required" },
  { code: "err_133", message: "App not found" },

  { code: "err_134", message: "This account is already verified please login" },

  // ? Other errors

  { code: "err_135", message: "Expiration duration is required" },
  { code: "err_136", message: "Duration type is required" },
  { code: "err_137", message: "All domain field is required" },
  { code: "err_138", message: "From domain is required" },
  { code: "err_139", message: "Domain is not verified" },
  {
    code: "err_140",
    message: "Both Domains should be different from each other",
  },
  { code: "err_141", message: "Telegram Bot data already exist" },
  { code: "err_142", message: "Telegram Bot Token is required" },
  { code: "err_143", message: "Telegram Bot Chat Id is required" },
  { code: "err_144", message: "Telegram Bot Id is required" },
  { code: "err_145", message: "Telegram Bot not found" },
  { code: "err_146", message: "This URL is blocked by admin" },
  { code: "err_147", message: "Delete Duration is required" },
  {
    code: "err_148",
    message: "Selected Space must be different from current space",
  },
  { code: "err_149", message: "This link already exists, can not be created" },
  { code: "err_150", message: "This link is not secured it must be https" },

  // ? Promocode errors
  { code: "err_151", message: "Promocode name is required" },
  { code: "err_152", message: "Promocode percentage discount is required" },
  { code: "err_153", message: "Promocode amount off is required" },
  { code: "err_154", message: "Total number of redeems is required" },
  { code: "err_155", message: "Promocode is required" },
  { code: "err_156", message: "Promocode type is required" },
  { code: "err_157", message: "Promocode id is required" },
  { code: "err_158", message: "Promocode status is not valid" },
  { code: "err_159", message: "Promocode is already exist" },
  { code: "err_160", message: "Promocode not found" },

  // ? Package errors
  { code: "err_161", message: "Package name is required" },
  { code: "err_162", message: "Package id is required" },
  { code: "err_163", message: "Package data not found" },
  { code: "err_164", message: "Package status is required" },
  { code: "err_165", message: "Amount is required" },
  { code: "err_166", message: "You can not buy own package" },
  { code: "err_167", message: "You are not eligible to buy this package" },
  { code: "err_168", message: "Package is expired" },
  { code: "err_169", message: "Package duration is required" },
  {
    code: "err_170",
    message: "This package has active users you can not delete it",
  },
  { code: "err_171", message: "Not eligible to purchase package" },
  { code: "err_172", message: "Something went wrong please try again later" },
  { code: "err_173", message: "First add paypal config data" },
  { code: "err_174", message: "Chrome Extension Add On Price is required" },
  { code: "err_175", message: "Chrome Extension Add On already exist" },
  { code: "err_176", message: "Chrome Extension Add On Id is required" },
  { code: "err_177", message: "Chrome Extension Add On not found" },
  {
    code: "err_178",
    message: "You have already purchased Chrome Extension Add-on feature",
  },
  {
    code: "err_179",
    message:
      "You already have Chrome Extension Add-on feature in your current package",
  },
  { code: "err_180", message: "Download Link is required" },

  // ? Promocode errors
  { code: "err_181", message: "Promocode is expired" },
  { code: "err_182", message: "Promocode can not be apply" },
  { code: "err_183", message: "Promocode already used" },
  { code: "err_184", message: "Promocode is redeemed" },

  // ? Support Text
  { code: "err_191", message: "Support Text already exist" },
  { code: "err_192", message: "Support Text not found" },
  { code: "err_193", message: "Support text is required" },
  { code: "err_194", message: "Support Text Id is required" },

  // ? PayPal Config
  { code: "err_201", message: "Paypal Client Id is required" },
  { code: "err_202", message: "Paypal Client Secret is required" },
  { code: "err_203", message: "Paypal Data already exist" },
  { code: "err_204", message: "Paypal Data not found" },
  { code: "err_205", message: "Paypal Id is required" },

  { code: "err_211", message: "Too many requests" },

  { code: "err_231", message: "Help Center URL already exists" },
  { code: "err_232", message: "Help Center URL required" },
  { code: "err_233", message: "Help Center status is required" },
  { code: "err_234", message: "Help Center id required" },
  { code: "err_235", message: "Terms of URL is required" },
  { code: "err_236", message: "Terms of URL status is required" },
  { code: "err_237", message: "System redirection link is required" },
  { code: "err_238", message: "User redirection link is required" },

  {
    code: "err_241",
    message:
      "This URL has been flagged as Phishing, Malicious or Spam. You are not allowed to add this URL",
  },
  { code: "err_242", message: "Please enter api key" },
  { code: "err_243", message: "Please enter total limit" },
  { code: "err_244", message: "Please enter rapid api id" },
  { code: "err_245", message: "Rapid API data not found" },

  { code: "err_251", message: "Chat id is required" },
  { code: "err_252", message: "Notification type required" },
  { code: "err_253", message: "Notification sent time is required" },

  // ? Pabbly Package
  { code: "err_261", message: "Product name already exists in pabbly" },
  { code: "err_262", message: "Please enter pabbly package id" },
  { code: "err_263", message: "Pabbly package data not found" },

  // ? Domain Verification
  {
    code: "err_281",
    message:
      "Your Domain's A record is not pointing to our IP Address. Please check your DNS Settings",
  },
  { code: "err_282", message: "Your Domain is not configured properly" },
  {
    code: "err_283",
    message:
      "There is an SSL issue with your domain. If you have configured domain using Cloudflare then please enable Proxied option at A record settings",
  },

  // ? Google Safe Browsing
  {
    code: "err_291",
    message: "Please enter client id",
  },
  {
    code: "err_292",
    message: "Please enter safe browsing id",
  },
  {
    code: "err_293",
    message: "Safe browsing data not found",
  },
  {
    code: "err_294",
    message: "Please enter cron job frequency",
  },
  {
    code: "err_295",
    message:
      "One of your URL has been flagged as Phishing, Malicious or Spam. You are not allowed to add this URL",
  },

  {
    code: "err_301",
    message:
      "Your domain status is unverified.So you can't set domain as a default",
  },
  { code: "err_500", message: "Something went wrong" },
];

export const badRequestErrorMessage = (errors, functionName) => {
  const error = typeof errors === "object" ? errors.array()[0].msg : errors;
  logger.log(
    level.error,
    `<< ${functionName}() error=${errorMessageFunction(error)}`
  );
};

export const loggerErrorMessage = (errorMessage, functionName) => {
  logger.log(
    level.error,
    `<< ${functionName}() error=${errorMessageFunction(errorMessage)}`
  );
};
