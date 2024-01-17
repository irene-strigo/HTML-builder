const fs = require("fs");
const path = require("path");
const readline = require("readline");
const {
    stdin: input,
    stdout: output,
} = require("process");

const rl = readline.createInterface({ input, output });

const writeableStream = fs.createWriteStream(path.posix.basename("02-write-file\\greeting.txt"));
writeableStream.write("Введите текст:");
console.log('Введите текст и нажмите Enter:')
rl.on('line', (input) => {
    if (input != '') {
        console.log(`Получено: ${input}`);
        console.log('Введите текст и нажмите Enter:');
        writeableStream.write(input);
    }
    if (input.toLowerCase() === 'exit') {
        rl.close();
    }
});

rl.on('close', () => {
    fs.unlink(path.posix.basename("02-write-file\\greeting.txt"), err => {
        if (err) throw err;
        console.log('Всего хорошего! Файл успешно удалён');
    })
});

