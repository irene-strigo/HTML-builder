const path = require('path');
const fs = require('fs');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      if (file.isFile()) {
        fs.stat(
          path.join(__dirname, 'secret-folder', file.name),
          function (err, stats) {
            const ext = path.extname(file.name);
            console.log(
              `${file.name.slice(0, -ext.length)} - ${path
                .extname(file.name)
                .slice(1)} - ${stats['size']}`,
            );
          },
        );
      }
    });
  },
);
