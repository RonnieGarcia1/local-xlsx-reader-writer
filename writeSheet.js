const financialDataObj = require('./readSheet.js')
module.exports = writeSheet = (newFinancialData) => {
  console.log("A new WorkSheet has been created:")
  console.log(financialDataObj());
    //requiring module
    const reader = require('xlsx');
    //reading test file
    const file = reader.readFile('./testData.xlsx');
    //writing financial data json to new sheet
    const ws = reader.utils.json_to_sheet(newFinancialData)
    reader.utils.book_append_sheet(file, ws, "Output")
    //adding new sheet to current worksheet
    reader.writeFile(file, './testData.xlsx');
};

writeSheet(financialDataObj())