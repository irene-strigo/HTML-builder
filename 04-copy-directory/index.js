const path = require('path');
const fs = require('fs');

function copyDir(src, dst) {
  fs.readdir(src, (err, files) => {
    if (err) throw err;
    let originals = files;
    fs.mkdir(dst, { recursive: true }, (err) => {
      if (err) throw err;
      for (let file of files) {
        fs.copyFile(path.join(src, file), path.join(dst, file), (err) => {
          if (err) throw err;
        });
      }
    });
    fs.readdir(dst, (err, files) => {
      if (err) throw err;
      let copies = files;
      for (let i = 0; i < copies.length; i++) {
        if (!originals.includes(copies[i])) {
          fs.unlink(path.join(dst, copies[i]), function (err) {
            if (err) throw err;
          });
        }
      }
    });
    console.log('Folder created');
    console.log('files in folder');
  });
}

const src = path.join(__dirname, 'files');
const dst = path.join(__dirname, 'files-copy');
copyDir(src, dst);
