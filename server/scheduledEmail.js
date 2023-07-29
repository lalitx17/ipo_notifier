const {
    fs,
    ejs,
  } = require("./app.js");

  const { customMail } = require('./email.js');


const sendEmailOnSpecificTime = (targetDay, targetTime, getEmails, ipoData, fetchData, previousDay) => {
  const currentDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' });
  const currentDay = new Date(currentDate).getDay();
  const currentHour = new Date(currentDate).getHours();
  const currentMinute = new Date(currentDate).getMinutes();



  if (targetDay.includes(currentDay)) {
    if (currentHour === targetTime[0] && currentMinute === targetTime[1]) {
      if (currentDay !== previousDay) {
        console.log(currentDay, currentHour, currentMinute);

        async function sendIpoEmail(receiver) {
          try {
            const templatex = await fs.promises.readFile('./ipoEmail.ejs', 'utf8');
            const activeIpos = await ipoData(fetchData);
            const renderedIpoHtml = ejs.render(templatex, { activeIpos: activeIpos });

            customMail(receiver, "IPO Email", "Welcome", renderedIpoHtml);

            console.log('Email sent successfully.');
          } catch (error) {
            console.error('Error occurred while sending email:', error);
          }
        }

        getEmails()
          .then((emails) => {
            sendIpoEmail(emails);
          })
          .catch((error) => {
            console.log(error);
          });

        return currentDay;
      }

    }
  }
}


module.exports = {sendEmailOnSpecificTime};