const {
  nodemailer,
  google
} = require("./app.js");

require("dotenv").config();

async function sendMail(mailOptions) {

  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET, 
    process.env.REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "iponotifier@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}


const customMail = (receiver, subject, body, code, sender = '"IPO Notifier" <ipo@lalityadav.com.np>',) => {
  mailOptions = {
    from: sender,
    to: receiver,
    subject: subject,
    text: body,
    html: code
  };

  sendMail(mailOptions)
    .then((result) => {console.log("Email Sending...", result)})
    .catch((error) => {
      console.log(error.message);
    });

};


module.exports = { customMail };