const path = require("path");
const fs = require("fs");
const readline = require('readline');

fs.readdir(path.join(__dirname, "styles"), { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        if (file.isFile() && path.extname(file.name) === ".css") {
            fs.readFile(path.join(__dirname, "styles", file.name), function (err, data) {
                if (err) throw err;
                fs.appendFile(path.join(__dirname, "project-dist", "bundle.css"), data, { recursive: true }, (err) => {
                    if (err) throw err;
                })
            });
        }
    })
})