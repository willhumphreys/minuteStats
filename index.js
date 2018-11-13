const csv = require('csv-parser')
const fs = require('fs')

const argv = require('minimist')(process.argv.slice(2));

const input = argv.in;
const out = argv.out;

console.log(`input ${input} out ${out}`);

const results = [];

let existing = 1000;
let currentOpen = 0;
let bestLow = 0;
let bestHigh = 0;
let startDate = null;

const file = fs.createWriteStream(out);

file.write('date,bestLow,bestHigh\n');

fs.createReadStream(input)
    .pipe(csv())
    .on('data', (line) => {

        const currentDate = new Date(line.dateTime);



        const current = currentDate.getMinutes() % 15;

        if (current < existing) {
            // console.log(`${current} ${currentDate}`);

            let invalid = false;


            let timeDiff;
            if (startDate != null) {
                timeDiff = Math.abs(startDate.getTime() - currentDate.getTime());

                const oneHour = 1000 * 60 * 60;


                if (timeDiff > oneHour) {
                    invalid = true;
                }

            }

            if (invalid) {
                console.log(`Invalid gap ${timeDiff} previous ${startDate.toISOString()} current ${currentDate.toISOString()}`);
            } else if (startDate != null) {
                file.write(`${startDate.toISOString()},${bestLow},${bestHigh}\n`);
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

        //console.log(`${new Date(line.dateTime)}  ${line.high}`)
    })

    .on('end', () => {
        console.log("Finished");
        file.end();
    });