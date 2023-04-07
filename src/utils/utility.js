import crypto from "crypto";
// import transport from './transport';
// import { logger, level } from '../config/logger';
import bcrypt from "bcryptjs";
import qs from "qs";
import HTTPStatus from "http-status";
// import { constants as ERROR_CONST } from '../constant/error';
const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
const iv = Buffer.from(process.env.IV_KEY, "hex");
// const algorithm = 'aes-128-cbc';
// const key = 'apppasswordkey';
// const inputEncoding = 'utf8';
// const outputEncoding = 'hex';

export const sendResponse = (res, statusCode, data) => {
  res.status(statusCode).send(data);
};

export const sendJSONResponse = (res, statusCode, data) => {
  res.status(statusCode).json(data);
};

export const redirectRequest = (res, url) => {
  res.redirect(url);
};

export const createSuccessResponseJSON = (data) => {
  const response = {
    data,
  };
  return response;
};

export const createErrorResponseJSON = (error) => {
  const errorResponse = {
    error,
  };
  return errorResponse;
};

// export const encrypt = (data) => {
//   const mykey = crypto.createCipher(algorithm, key);
//   let mystr = mykey.update(data, inputEncoding, outputEncoding);
//   mystr += mykey.final('hex');
//   return mystr;
// };

// export const decrypt = (data) => {
//   const mykey = crypto.createDecipher(algorithm, key);
//   let mystr = mykey.update(data, outputEncoding, inputEncoding);
//   mystr += mykey.final('utf8');
//   return mystr;
// };

export const encrypt = async (data) => {
  const salt = await bcrypt.genSalt(10);
  let mystr = await bcrypt.hash(data, salt);
  return mystr;
};

export const decrypt = async (data, hashData) => {
  const match = await bcrypt.compare(data, hashData);
  return match;
};

export const standardStructureStringToJson = (queryString) => {
  return qs.parse(queryString);
};

export const standardStructureJsonToString = (standardJson) => {
  return qs.stringify(standardJson);
};

export const getOptionsPipelineJson = (extraParams) => {
  const json = {};
  if (extraParams.search) {
    json.search = extraParams.search;
  }
  if (extraParams.limit) {
    json.limit = Number(extraParams.limit);
  }
  if (extraParams.page || extraParams.limit) {
    let page = Number(extraParams.page);
    let limit = Number(extraParams.limit);
    json.skip = page > 0 ? (page - 1) * limit : 0;
    json.limit = limit;
  }
  if (extraParams.category) {
    json.category = extraParams.category;
  }

  return json;
};

export const getOptionsJson = (extraParams) => {
  const json = {};
  if (extraParams.limit) {
    json.limit = Number(extraParams.limit);
  }
  if (extraParams.page) {
    json.page = Number(extraParams.page);
  }
  if (extraParams.sort) {
    json.sort = extraParams.sort;
  } else {
    json.sort = "-created_at";
  }
  return json;
};

// export const sendEmail = async (to, from, subject, text, html, attachments) => {
//   logger.log(
//     level.debug,
//     `utility sendEmail to=${to}, from=${from},subject=${subject},
//      text=${text},
//      html=${html}`
//   );
//   try {
//     var mailOptions = {
//       from,
//       to,
//       subject,
//       text,
//       html,
//       attachments,
//     };
//     await transport.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         logger.log(level.error, `utility sendEmail ${error}`);
//       }
//       logger.log(level.debug, `Email sent:  ${info.response}`);
//     });
//   } catch (error) {
//     logger.log(
//       level.error,
//       `utility sendEmail to=${to}, from=${from},subject=${subject},
//       error=${error}`
//     );
//   }
// };

/**
 * if badRequestError used for catching independent erro not in validator error than send
 * string as a second parameter
 * example badRequestError(res, 'err_13')
 */
export const badRequestError = (res, errors) => {
  let code, response;
  const error = typeof errors === "object" ? errors.array()[0].msg : errors;
  const data = {
    message: error,
  };
  code = HTTPStatus.BAD_REQUEST;
  response = createErrorResponseJSON(data);
  return sendJSONResponse(res, code, response);
};

export const successResponse = (res, data) => {
  let code, response;
  code = HTTPStatus.OK;
  response = createSuccessResponseJSON(data);
  return sendJSONResponse(res, code, response);
};

export const successResponseCreated = (res, data) => {
  let code, response;
  code = HTTPStatus.CREATED;
  response = createSuccessResponseJSON(data);
  return sendJSONResponse(res, code, response);
};

export const serverError = (res) => {
  let code, response;
  const data = {
    message: "err_500",
  };
  code = HTTPStatus.INTERNAL_SERVER_ERROR;
  response = createErrorResponseJSON(data);
  return sendJSONResponse(res, code, response);
};

export const notFoundError = (res) => {
  let code, response;
  const data = {
    message: "err_404",
  };
  code = HTTPStatus.NOT_FOUND;
  response = createErrorResponseJSON(data);
  return sendJSONResponse(res, code, response);
};

export const authError = (res) => {
  let code, response;
  const data = {
    message: "err_401",
  };
  code = HTTPStatus.UNAUTHORIZED;
  response = createErrorResponseJSON(data);
  return sendJSONResponse(res, code, response);
};

export function encryptText(text) {
  let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  let encryptedData = encrypted.toString("hex");
  return encryptedData;
}

export function decryptText(text) {
  if (text === null || typeof text === "undefined") return text;
  let encryptedText = Buffer.from(text, "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export const orderOTPGenerator = () => {
  let result = "";
  let chars = "0123456789";
  for (let i = 6; i > 0; --i) {
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result;
};

export const regexSpecialChar = (search) => {
  if (search.includes("(")) {
    search = search.replace("(", "\\(");
  }
  if (search.includes(")")) {
    search = search.replace(")", "\\)");
  }
  if (search.includes("{")) {
    search = search.replace("{", "\\{");
  }
  if (search.includes("}")) {
    search = search.replace("}", "\\}");
  }
  if (search.includes("[")) {
    search = search.replace("[", "\\[");
  }
  if (search.includes("]")) {
    search = search.replace("]", "\\]");
  }
  if (search.includes(".")) {
    search = search.replace(".", "\\.");
  }
  if (search.includes("|")) {
    search = search.replace("|", "\\|");
  }
  if (search.includes("*")) {
    search = search.replace("*", "\\*");
  }
  if (search.includes("+")) {
    search = search.replace("+", "\\+");
  }
  if (search.includes('"')) {
    search = search.replace('"', '\\"');
  }
  if (search.includes("@")) {
    search = search.replace("@", "\\@");
  }
  return search;
};
