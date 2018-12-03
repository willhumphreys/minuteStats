const csv = require('csv-parser')
const fs = require('fs')
import { processLine } from './line-processor'

export const execute = (input, out, timePeriod) => {

    console.log(`running with input: ${input} output: ${out} and timePeriod: ${timePeriod}`)

    const file = fs.createWriteStream(out);

    file.write('date,bestLow,bestHigh');

    const read = fs.createReadStream(input)
        .pipe(csv())
        .on('data', (line) => {
            const record = processLine(line, timePeriod);

            if (record.live === true) {
                file.write(`\n${record.lastDate.toISOString()},${record.bestLow},${record.bestHigh}`);
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



