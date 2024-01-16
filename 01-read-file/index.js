const fs = require("fs");
const path = require("path");
const readableStream = fs.createReadStream(path.posix.basename("01-read-file\\text.txt"));
readableStream.on("data", function (chunk) {
    console.log(chunk.toString());
});


/*const fs = require("fs");

fs.readFile("01-read-file\\text.txt", function (error, data) {
    if (error) {
        console.log(error)
    }
    console.log(data + '');
});*/
