import { timeDiff } from './processing-logic'

let existing = 1000;
let bestLow = 0;
let bestHigh = 0;
let startDate = null;

export const processLine = (line, divisor) => {
    const currentDate = new Date(line.dateTime + 'Z');
    const current = currentDate.getMinutes() % divisor;
    let newLine = null;
    if (current < existing) {
        const invalid = timeDiff(startDate, currentDate);
        if (!invalid && startDate != null) {
            newLine = `\n${startDate.toISOString()},${bestLow},${bestHigh}`;
        }
        let currentOpen = line.open;
        bestLow = 0;
        bestHigh = 0;
        startDate = currentDate;
    }
    const potentialNewLow = Math.abs(line.open - line.low);
    if (potentialNewLow > bestLow) {
        bestLow = potentialNewLow;
    }
    const potentialNewHigh = Math.abs(line.open - line.high);
    console.log(`new high ${potentialNewHigh}`);
    if (potentialNewHigh > bestHigh) {
        console.log('here');
        bestHigh = potentialNewHigh;
    }
    existing = current;

    return { newLine, bestHigh, bestLow };
}