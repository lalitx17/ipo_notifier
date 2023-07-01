const fetchData = require('./ipo.js');


async function ipoData() {
    
  try {
    const data = await fetchData();
    let openIpos = [];
    let upcomingIpos = [];
    
    for (let i = 0; i < data.length; i++){
        if (data[i][5] !== 'Closed'){
            if (data[i][5] === 'Open'){
              openIpos.push(data[i]);
            }else{
              upcomingIpos.push(data[i]);
            }
        }
    }
    

    console.log(data[1][5]);
    return openIpos;

  } catch (error) {
    console.error(error);
  }
}

module.exports = ipoData;