const path = require('path');
const fs = require('fs');

const mergeFiles = (src, dst) => {
  return fs.readdir(src, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    let content = '';
    files.forEach((file) => {
      if (file.isFile() && path.extname(file.name) === '.css') {
        fs.readFile(path.join(src, file.name), function (err, data) {
          if (err) throw err;
          content += data.toString('utf-8');
          fs.writeFile(dst, content, (err) => {
            if (err) throw err;
          });
        });
      }
    });
  });
};

const src = path.join(__dirname, 'styles');
const dst = path.join(__dirname, 'project-dist/bundle.css');
mergeFiles(src, dst);
