const path = require('path');
const fs = require('fs');
/*const copyDir = require('../04-copy-directory');*/
/*const mergeFiles = require('../05-merge-styles');*/
/*const { mergeFiles } = require('../05-merge-styles');*/
/*не догоняю как сделать импорт чтоб оно работало*/

/*вот тут чтение template файла и вывод его строкой, поиск не понимаю как*/
const templateHtmlContent = fs.createReadStream(
    path.join(__dirname, 'template.html'),
);
templateHtmlContent.on('data', function (chunk) {
    let stringContent = chunk.toString();
    console.log(stringContent);
});


/*создание директории и файла с копиями assets и стилей, работет но не так как надо*/
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) throw err;
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
        if (err) throw err;
    })
});

/*копирую assets, на каждую папку вызываю функцию из 4 задания*/
fs.readdir(path.join(__dirname, "assets"), (err, folders) => {
    if (err) throw err;
    for (let folder of folders) {
        console.log(folder)

        /*должен быть вызов функции для копирования содержимого папок в новую директорию, но тут копия функции*/
        /*и ещё проблема в том, что пути надо поменять в этом задании, то есть это надо тоже внести в функцию как аргумент*/
        function copyDir(src, dst) {
            fs.readdir(path.join(__dirname, "assets", src), (err, files) => {
                if (err) throw err;
                let originals = files;
                fs.mkdir(path.join(__dirname, "project-dist", "assets", dst), { recursive: true }, (err) => {
                    if (err) throw err;
                    for (let file of files) {
                        fs.copyFile(
                            path.join(__dirname, "assets", src, file),
                            path.join(__dirname, "project-dist", "assets", dst, file),
                            (err) => {
                                if (err) throw err;
                            },
                        );
                    }
                });
                fs.readdir(path.join(__dirname, "project-dist", "assets", dst), (err, files) => {
                    if (err) throw err;
                    let copies = files;
                    for (let i = 0; i < copies.length; i++) {
                        if (!originals.includes(copies[i])) {
                            fs.unlink(
                                path.join(__dirname, "project-dist", "assets", dst, copies[i]),
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
        copyDir(folder, folder);
    }
});
/*должен быть вызов функции для создания общего файла стилей, но тут просто копия этой функции, та же проблема*/
/*mergeFiles('styles', 'project-dist', 'style.css')*/
function mergeFiles(src, dst, name) {
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
mergeFiles('styles', 'project-dist', 'style.css')
