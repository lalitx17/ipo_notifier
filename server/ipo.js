const puppeteer = require('puppeteer');

async function fetchData() {
  let browser;

  while (true) {
    try {
      browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();
      await page.goto('https://nepsealpha.com/investment-calandar/ipo');
      await page.waitForSelector('select[name="DataTables_Table_0_length"]');
      await page.evaluate(() => {
        const dropdown = document.querySelector('select[name="DataTables_Table_0_length"]');
        dropdown.value = '100';
        dropdown.dispatchEvent(new Event('change', { bubbles: true }));
      });
      await page.waitForFunction(() => {
        const pageInfo = document.querySelector("#DataTables_Table_0_info").textContent.trim();
        const rowCount = pageInfo.split(" ");
        return rowCount[3] === '100';
      });
      const data = await page.evaluate(() => {
        const nepse_ipo = Array.from(document.querySelectorAll('tr.odd, tr.even'));
        return nepse_ipo.map(odd => {
          const columns = Array.from(odd.querySelectorAll('td'));
          return columns.map(column => column.textContent.trim());
        });
      });
      await browser.close();
      return data; // Return the data

    } catch (error) {
      if (browser) {
        await browser.close();
      }
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

module.exports = fetchData;
