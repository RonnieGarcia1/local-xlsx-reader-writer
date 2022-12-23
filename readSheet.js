module.exports = readSheetAsJson = () => {
  //import module from xlsx
  const reader = require('xlsx');
  //import xlsx test data
  const file = reader.readFile('./testData.xlsx');
  //import date serial converter function
  const convertDate = require('./convertDate.js');
  //initialize empty array
  let data = [];
  //All Sheets in workbook
  const sheets = file.SheetNames;
  //iterating through worksheets
  for(let i = 0; i < sheets.length; i++){
    //converting sheets to json (temp)
    const temp = reader.utils.sheet_to_json(
      file.Sheets[file.SheetNames[i]])
      //iterating through json and pushing into new array 
      temp.forEach((res) => {
        data.push(res)  
      });
    };

    let index = 0;
    // set client id
    let customerId = data[index].CustomerId;
    // set date serial
    let dateSerial = data[index].Date;
    // set min
    let min = Infinity;
    // set max
    let max = -Infinity;
    // set balance
    let balance = 0;

    let financialDataArr = [];
    
    // while we are looking at the same client
    while(index <= data.length){
      
      // we are done with this customers transactions, lets process
      if(index === data.length || data[index].CustomerId !== customerId){
        
          const currentDate = convertDate(dateSerial); 
          const currentMonth = currentDate.getMonth()+2;
          const currentYear = currentDate.getFullYear();
          const formattedDate = `${currentMonth}/${currentYear}`;
          
          let financialData = {
            customerId: customerId,
            MMYYYY: formattedDate,
            minBalance: min, 
            maxBalance: max, 
            endingBalance: balance
          }
          financialDataArr = [financialData, ...financialDataArr]
          
          //TODO: writeSheet(financialData)
          
          // we are done with the data set, all done
        if(index === data.length) break;
        
        // reset for new customer
        customerId = data[index].CustomerId
        balance = 0;
        min = Infinity;
        max = -Infinity;
      }
      
      // process a single transaction for a customer
      balance += data[index].Amount;      
      if(balance > max){
        max = balance
      }
      
      if (balance < min){
        min = balance;
      }
      index++;
    }

    return financialDataArr;
    
    };
    console.log(readSheetAsJson());