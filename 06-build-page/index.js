const path = require('path');
const fs = require('fs');
/*const copyDir = require('../04-copy-directory');*/
const mergeFiles = require('../05-merge-styles');
/*const { mergeFiles } = require('../05-merge-styles');*/

const templateHtmlContent = fs.createReadStream(
    path.join(__dirname, 'template.html'),
);
templateHtmlContent.on('data', function (chunk) {
    let stringContent = chunk.toString();
    console.log(stringContent);
});

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) throw err;
});
mergeFiles('styles', 'project-dist', 'style.css')
/*function mergeFiles(src, dst, name) {
    fs.readdir(
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
                            fs.appendFile(
                                path.join(__dirname, dst, name),
                                data,
                                (err) => {
                                    if (err) throw err;
                                },
                            );
                        },
                    );
                }
            });
        },
    );
}
mergeFiles('styles', 'project-dist', 'style.css')*/
