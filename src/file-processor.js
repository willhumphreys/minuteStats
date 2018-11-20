const csv = require('csv-parser')
const fs = require('fs')
import { timeDiff } from './processing-logic'

export const execute = (input, out) => {

    console.log(`running with ${input} and ${out}`)
    const results = [];

    let existing = 1000;
    let currentOpen = 0;
    let bestLow = 0;
    let bestHigh = 0;
    let startDate = null;

    const file = fs.createWriteStream(out);

    file.write('date,bestLow,bestHigh');

    const read = fs.createReadStream(input)
        .pipe(csv())
        .on('data', (line) => {
            const currentDate = new Date(line.dateTime + 'Z');

            const current = currentDate.getMinutes() % 15;

            if (current < existing) {

                const invalid = timeDiff(startDate, currentDate);


                if (!invalid && startDate != null) {
                    file.write(`\n${startDate.toISOString()},${bestLow},${bestHigh}`);
                }

                currentOpen = line.open;
                bestLow = 0;
                bestHigh = 0;
                startDate = currentDate;

            }

            const potentialNewLow = Math.abs(line.open - line.low);

            if (potentialNewLow > bestLow) {
                bestLow = potentialNewLow;
            }

            const potentialNewHigh = Math.abs(line.open - line.high);

            if (potentialNewHigh > bestHigh) {
                bestHigh = potentialNewHigh
            }

            existing = current;
        })

    const end = new Promise(function (resolve, reject) {
        read.on('end', () => {
            file.end(() => {
                resolve('complete')
            });

        });
        read.on('error', reject); // or something like that
    });

    return end;
}

