const csv = require('csv-parser')
const fs = require('fs')
import { processLine } from './line-processor'

export const execute = (input, out) => {

    console.log(`running with ${input} and ${out}`)



    const file = fs.createWriteStream(out);

    file.write('date,bestLow,bestHigh');

    const read = fs.createReadStream(input)
        .pipe(csv())
        .on('data', (line) => {
            const { newLine } = processLine(line, 15);

            if (newLine !== null) {
                file.write(newLine);
            }

        })

    const end = new Promise(function (resolve, reject) {
        read.on('end', () => {
            file.end(() => {
                resolve('complete')
            });

        });
        read.on('error', reject);
    });

    return end;
}



