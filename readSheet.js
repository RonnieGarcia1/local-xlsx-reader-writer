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
    let customerId = data[index].CustomerId;
    let dateSerial = data[index].Date;
    let min = Infinity;
    let max = -Infinity;
    let balance = 0;
    let reverseFinancialDataArr = [];
    
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
          reverseFinancialDataArr = [financialData, ...reverseFinancialDataArr]     
        
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
    let financialDataArr = reverseFinancialDataArr.reverse()
    console.table(financialDataArr)
    return financialDataArr;
    };
    readSheetAsJson()