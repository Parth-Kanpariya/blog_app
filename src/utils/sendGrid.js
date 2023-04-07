import sgMail from "@sendgrid/mail";
import { logger, level } from "../config/logger";
import { constants as SENDGRID_CONST } from "../constant/sendgrid";

sgMail.setApiKey(SENDGRID_CONST.SENDGRID_API_KEY);

const sendGrid = async (msg) => {
  sgMail.send(msg, (err, _res) => {
    console.log("err==============", err);
    if (err) throw { err };
    else {
      logger.log(level.debug, `Email sent successfully.`);
    }
  });
};

export default sendGrid;
