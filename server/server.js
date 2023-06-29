const express = require("express");
const cors = require("cors");
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

//sending email through gmail api.

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })


async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    
    const transport = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        type: 'OAuth2', 
        user: 'lalityadav.x17@gmail.com', 
        clientId: process.env.CLIENT_ID, 
        clientSecret: process.env.CLIENT_SECRET, 
        refreshToken: process.env.REFRESH_TOKEN, 
        accessToken: accessToken,
      }
    }); 
    
    const mailOptions = {
      from: '"IPO Notifier" <ipo@lalityadav.com.np>', 
      to: 'lalityadav.ver2@gmail.com', 
      subject: 'Hello from the other side', 
      text: 'we did it.',
    };
    
    const result = await transport.sendMail(mailOptions);
    return result;


  } catch (error) {
    return error;
  }
}

sendMail()
.then((result) => console.log("Email Sending...", result))
.catch((error) => {console.log(error.message)});



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
    console.log(user);
  }
  createUser()
  .then((data) => {
    res.send('yes');
  })
    .catch((e) => {
      console.error(e.message);
      res.send('no');
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  
});




//database operations

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
