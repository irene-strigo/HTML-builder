const path = require('path');
const fs = require('fs');

const mergeFiles = (src, dst, name) => {
  return fs.readdir(
    path.join(__dirname, src),
    { withFileTypes: true },
    (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        if (file.isFile() && path.extname(file.name) === '.css') {
          fs.readFile(
            path.join(__dirname, src, file.name),
            function (err, data) {
              if (err) throw err;
              fs.appendFile(path.join(__dirname, dst, name), data, (err) => {
                if (err) throw err;
              });
            },
          );
        }
      });
    },
  );
};

mergeFiles('styles', 'project-dist', 'bundle.css');

module.exports.mergeFiles = mergeFiles;
/*module.exports = mergeFiles;*/
/*exports.mergeFiles = mergeFiles;*/
