var fs = require('fs'),

    data = fs.readFileSync("table1.3_g20_2013.csv", {
        encoding: 'UTF8'
    }).toString();
var a = data.split("\r\n");
var b = a[0].split(",");
var head = [];
head[0] = b[0];
head[1] = b[14];
var output = [];
var line1 = a[1].split(",");
for (var i = 1; i < a.length - 3; i = i + 1) {
    var line = a[i].split(",");
    var object = {};
    object[head[0]] = line[0];
    object[head[1]] = line[14];
    output.push(object);
}



for (var j = 0; j < output.length; j++) {
    for (var i = 0; i < (output.length - j - 1); i++) {
        if (parseFloat(output[i][head[1]]) < parseFloat(output[i + 1][head[1]])) {
            var temp;
            temp = output[i];
            output[i] = output[i + 1];
            output[i + 1] = temp;
        }
    }
}
fs.writeFileSync("p2c.json", JSON.stringify(output));
