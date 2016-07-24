var readline = require('readline');
var fs = require('fs');
var header = [];
var jsonData = [];
var tempData = {};
var isHeader = true;

var rl = readline.createInterface({
   input: fs.createReadStream('table_1.3.csv')
});

rl.on('line', function(line) {
   var lineRecords = line.trim().split(',');;
   for (var i = 0; i < lineRecords.length; i++) {
       if (isHeader) {
           header[i] = lineRecords[i];
       }
       else {
           tempData[header[i]] = lineRecords[i];
           jsonData.push(tempData);
       }
   }
   tempData = {};
   isHeader = false;
   fs.writeFileSync("ass.json", JSON.stringify(jsonData), encoding = "utf8");
});