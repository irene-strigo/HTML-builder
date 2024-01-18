const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { stdin, stdout } = require("process");

const rl = readline.createInterface({ input: stdin, output: stdout });
const writeableStream = fs.createWriteStream(path.join(__dirname, "greeting.txt"), { flags: "a" });
console.log("Введите текст и нажмите Enter:")
rl.on("line", (input) => {
    if (input != "") {
        if (input.toLowerCase() === "exit") {
            rl.close();
        } else {
            console.log(`Получено: ${input}`);
            console.log("Введите текст и нажмите Enter:");
            writeableStream.write(`${input}\n`);
        }
    }
});
rl.on("close", () => {
    console.log("Всего хорошего!");
});
