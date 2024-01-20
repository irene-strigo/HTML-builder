const path = require('path');
const fs = require('fs');

function copyDir(src, dst) {
  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) throw err;
    let originals = files;
    fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
      if (err) throw err;
      for (let file of files) {
        fs.copyFile(
          path.join(__dirname, 'files', file),
          path.join(__dirname, 'files-copy', file),
          (err) => {
            if (err) throw err;
          },
        );
      }
    });
    fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
      if (err) throw err;
      let copies = files;
      for (let i = 0; i < copies.length; i++) {
        if (!originals.includes(copies[i])) {
          fs.unlink(
            path.join(__dirname, 'files-copy', copies[i]),
            function (err) {
              if (err) throw err;
            },
          );
        }
      }
    });
    console.log('Folder created');
    console.log('files in folder');
  });
}
copyDir();
module.exports.copyDir = copyDir;
