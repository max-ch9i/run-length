const fs = require('fs');

/*
const writeStream = fs.createWriteStream('write.file', {
    encoding: 'binary'
});

const arr = new Uint32Array(4);
arr[0] = 0x316d;
arr[1] = 97;
arr[2] = 120;
arr[3] = 0x0A;
const buff = Buffer.from(arr.buffer);
writeStream.end(buff);
*/

const verify = 'W12B1W12B3W24B1W14'; 

const stream = fs.createReadStream('sample.txt');

let caret = 0;
let sequence = [];

stream.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes.`);
    let chunkString = chunk.toString();
    while (caret < chunk.length) {
        let currentChar = chunkString.charAt(caret);
        sequence.push(currentChar);

        let offset = 1;
        while (currentChar === chunkString.charAt(caret + offset)) {
            offset += 1;
        }

        sequence.push(offset);
        caret += offset;
    }
    console.log(verify, sequence.join(''));
});
