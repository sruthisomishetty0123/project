var fs = require('fs'),

    data = fs.readFileSync("table_1.3.csv", {
        encoding: 'UTF8'
    }).toString();
var a = data.split("\r\n");
var b = a[0].split(",");
var head = [];
head[0] = b[0];
head[1] = b[5];
var output = [];
var line1 = a[1].split(",");
for (var i = 1; i < a.length - 3; i = i + 1) {
    var line = a[i].split(",");
    var object = {};
    object[head[0]] = line[0];
    object[head[1]] = line[5];
    output.push(object);
}



// for (var j = 3; j < output.length; j++) {

//     var sum;
//     sum=output[j]+sum;
// }
fs.writeFileSync("p22.json", JSON.stringify(output));
