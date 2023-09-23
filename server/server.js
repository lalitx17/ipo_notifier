const {
  express,
  cors,
  ejs,
  prisma
} = require("./app.js");

require("dotenv").config();


const {sendEmailOnSpecificTime} = require('./scheduledEmail.js');
const router = require('./router.js');

const ipoData = require('./formatData.js');
const fetchData = require('./ipoInfo.js');


const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router);
app.set("view engine", "ejs");


//sending the IPO data on wednesdays and saturdays
let previousDay = 7;
let IpoEmail;

const targetDay = [4, 1];
const targetTime = [7, 10];

async function getEmails() {
  const emails = await prisma.user.findMany({
    select: {
      email: true
    }
  });
  const emailList = emails.map((subscriber) => subscriber.email);
  return emailList;
}


setInterval(() => {
  IpoEmail = sendEmailOnSpecificTime(targetDay, targetTime, getEmails, ipoData, fetchData, previousDay);
  if (typeof IpoEmail === 'number'){
    previousDay = IpoEmail;
  }
}, 5000);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`)
});
