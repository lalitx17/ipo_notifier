const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = require('./router.js');

const ipoData = require('./formatData');

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/message', router);


//sending email through gmail api.

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });


async function sendMail(mailOptions) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "lalityadav.x17@gmail.com",
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

const customMail = ( receiver, subject, body, code, sender = '"IPO Notifier" <ipo@lalityadav.com.np>', ) => {
  mailOptions =  {
    from: sender,
    to: receiver,
    subject: subject,
    text: body,
    html: code
  };

  sendMail(mailOptions)
  .then((result) => console.log("Email Sending...", result))
  .catch((error) => {
    console.log(error.message);
  });

};



//accepting data form the client

app.post("/api/submit-form", (req, res) => {
  const formData = req.body;
  async function createUser() {
    const user = await prisma.user.create({
      data: {
        firstName: formData.FNAME,
        lastName: formData.LNAME,
        email: formData.EMAIL,
      },
    });
    customMail(formData.EMAIL, "You are subscribed to IPO notifier", "Welcome", '<h1>Welcome</h1>');
  }
  createUser()
    .then((data) => {
      res.send("yes");
    })
    .catch((e) => {
      console.error(e.message);
      res.send("no");
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});


async function formattedData() {
  try {
    const openIpox = await ipoData();

    console.log(openIpox);

  } catch (error) {
    console.error(error);
  }
}

formattedData();




app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
