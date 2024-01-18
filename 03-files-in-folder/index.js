const path = require("path");
const fs = require("fs");
const readdir = require("fs/promises");

fs.readdir(path.join(__dirname, "secret-folder"), { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        if (file.isFile()) {
            fs.stat(path.posix.basename("03-files-in-folder\\secret-folder") + "\\" + file.name, function (err, stats) {
                const ext = path.extname(file.name)
                console.log(`${file.name.slice(0, -ext.length)} - ${path.extname(file.name).slice(1)} - ${stats["size"]}`)
            });
        }
    });
})
