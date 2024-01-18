const path = require("path");
const fs = require("fs");
const readdir = require("fs/promises");

fs.readdir(path.posix.basename("03-files-in-folder\\secret-folder"), { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        if (file.isFile()) {
            fs.stat(path.posix.basename("03-files-in-folder\\secret-folder") + '\\' + file.name, function (err, stats) {
                console.log(`${file.name.split('.')[0]} - ${path.extname(file.name).slice(1)} - ${stats["size"]}`)
            });

        }
    });

})
