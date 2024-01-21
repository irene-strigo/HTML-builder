const path = require('path');
const fs = require('fs');

function copyDir(src, dst) {
    fs.readdir(path.join(__dirname, src), (err, files) => {
        if (err) throw err;
        let originals = files;
        fs.mkdir(path.join(__dirname, dst), { recursive: true }, (err) => {
            if (err) throw err;
            for (let file of files) {
                fs.copyFile(
                    path.join(__dirname, src, file),
                    path.join(__dirname, dst, file),
                    (err) => {
                        if (err) throw err;
                    },
                );
            }
        });
        fs.readdir(path.join(__dirname, dst), (err, files) => {
            if (err) throw err;
            let copies = files;
            for (let i = 0; i < copies.length; i++) {
                if (!originals.includes(copies[i])) {
                    fs.unlink(
                        path.join(__dirname, dst, copies[i]),
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
copyDir('files', 'files-copy');
module.exports.copyDir = copyDir;
