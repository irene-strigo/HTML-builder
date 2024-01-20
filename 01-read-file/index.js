const fs = require('fs');
const path = require('path');
const content = fs.createReadStream(path.join(__dirname, 'text.txt'));
content.on('data', function (chunk) {
  console.log(chunk.toString());
});
