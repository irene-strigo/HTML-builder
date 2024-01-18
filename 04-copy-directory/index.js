const path = require("path");
const fs = require("fs");

fs.mkdir(path.posix.basename("04-copy-directory\\files-copy"), { recursive: true }, (error) => {
    if (error) throw error;
    console.log("Folder created");
});
fs.readdir(path.posix.basename("04-copy-directory\\files"), (error, files) => {
    if (error) return console.log(error);
    files.forEach((file) => console.log(file));
});