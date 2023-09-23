const {
  express,
  fs,
  ejs,
  prisma
} = require("./app.js");

const router = express.Router();

const { customMail } = require('./email.js');

router.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

//accepting data form the client


router.post("/api/submit-form", (req, res) => {
  const formData = req.body;
  async function createUser() {
    const user = await prisma.user.create({
      data: {
        firstName: formData.FNAME,
        lastName: formData.LNAME,
        email: formData.EMAIL,
      },
    });

    fs.readFile('./welcomeEmail.ejs', 'utf8', (error, template) => {
      if (error) {
        console.log('Error occurred while reading HTML template file:', error);
        return;
      }

      // Call the email sending function with the template content
      const renderedHtml = ejs.render(template, { subscriberName: formData.FNAME });

      customMail(formData.EMAIL, "You are subscribed to IPO notifier", "Welcome", renderedHtml);
    });


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

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})


module.exports = router;