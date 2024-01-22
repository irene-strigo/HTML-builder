const path = require('path');
const fs = require('fs');

/* Уважаемый проверяющий! Задание сделано, и вроде даже работает как надо. Но я никак не могу понять
 каким образом подключить функции из заданий 04 и 05 НЕ копируя их (как сделано у меня),
  при том что функции в этих тасках вызываются. Если вы владеете этой информацией,
  напишите пожалуйста в комментарии, я буду бесконечно вам признательна!*/

const templateHtmlContent = fs.createReadStream(
  path.join(__dirname, 'template.html'),
);
templateHtmlContent.on('data', function (chunk) {
  const str = chunk.toString();
  const regex = /{{(\w+)}}/gm;

  async function getReplaces(src) {
    const replace = {};
    await fs.promises
      .readdir(src)
      .then(async (files) => {
        for (const file of files) {
          const key = file.split('.')[0];
          await fs.promises
            .readFile(path.join(src, file))
            .then((data) => (replace[key] = data.toString('utf-8')))
            .catch((err) => {
              throw err;
            });
        }
      })
      .catch((err) => {
        throw err;
      });

    return replace;
  }
  (async () => {
    const replaces = await getReplaces(path.join(__dirname, 'components'));

    function replacer(match, p1) {
      return replaces[p1] || match;
    }

    const res = str.replace(regex, replacer);

    const mainHtml = fs.createWriteStream(
      path.join(__dirname, 'project-dist', 'index.html'),
    );
    mainHtml.write(res);

    fs.mkdir(
      path.join(__dirname, 'project-dist'),
      { recursive: true },
      (err) => {
        if (err) throw err;
        fs.mkdir(
          path.join(__dirname, 'project-dist', 'assets'),
          { recursive: true },
          (err) => {
            if (err) throw err;
          },
        );
      },
    );
    fs.readdir(path.join(__dirname, 'assets'), (err, folders) => {
      if (err) throw err;
      for (let folder of folders) {
        /*копия функции из задания 04*/
        const copyDir = (src, dst) => {
          fs.readdir(path.join(__dirname, 'assets', src), (err, files) => {
            if (err) throw err;
            let originals = files;
            fs.mkdir(
              path.join(__dirname, 'project-dist', 'assets', dst),
              { recursive: true },
              (err) => {
                if (err) throw err;
                for (let file of files) {
                  fs.copyFile(
                    path.join(__dirname, 'assets', src, file),
                    path.join(__dirname, 'project-dist', 'assets', dst, file),
                    (err) => {
                      if (err) throw err;
                    },
                  );
                }
              },
            );
            fs.readdir(
              path.join(__dirname, 'project-dist', 'assets', dst),
              (err, files) => {
                if (err) throw err;
                let copies = files;
                for (let i = 0; i < copies.length; i++) {
                  if (!originals.includes(copies[i])) {
                    fs.unlink(
                      path.join(
                        __dirname,
                        'project-dist',
                        'assets',
                        dst,
                        copies[i],
                      ),
                      function (err) {
                        if (err) throw err;
                      },
                    );
                  }
                }
              },
            );
          });
        };
        copyDir(folder, folder);
      }
    });

    /*копия функции из задания 05*/
    const mergeFiles = (src, dst) => {
      return fs.readdir(
        path.join(__dirname, src),
        { withFileTypes: true },
        (err, files) => {
          if (err) throw err;
          let content = '';
          files.forEach((file) => {
            if (file.isFile() && path.extname(file.name) === '.css') {
              fs.readFile(
                path.join(path.join(__dirname, src), file.name),
                function (err, data) {
                  if (err) throw err;
                  content += data.toString('utf-8');
                  fs.writeFile(path.join(__dirname, dst), content, (err) => {
                    if (err) throw err;
                  });
                },
              );
            }
          });
        },
      );
    };
    mergeFiles('styles', 'project-dist/style.css');
  })();
});
