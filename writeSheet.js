const financialDataJson = require('./readSheet.js')

module.exports = writeSheet = (newFinancialData) => {
    //requiring module
    const reader = require('xlsx');
    //reading empty sheet
    const file = reader.readFile('./testData.xlsx');
    //writing financial data json to new sheet
    const ws = reader.utils.json_to_sheet(newFinancialData)
    reader.utils.book_append_sheet(file, ws, "Output")
    //adding new sheet to current workbook
    reader.writeFile(file, './testData.xlsx');
    console.log("A new sheet was created successfully!")
};

writeSheet(financialDataJson());