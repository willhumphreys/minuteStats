import { invalidGap } from './processing-logic'

let lastMinute = 1000;

class Record {

    constructor(bestLow, bestHigh, lastDate, live) {
        this.bestLow = bestLow;
        this.bestHigh = bestHigh;
        this.lastDate = lastDate;
        this.live = live;
    }
}

export const processLine = (line, divisor) => {
    const currentDate = new Date(line.dateTime + 'Z');
    const currentMinute = currentDate.getMinutes() % divisor;

    let currentRecord = new Record(0, 0, currentDate, false);

    if (currentMinute < lastMinute) {
        if (currentRecord && !invalidGap(currentRecord.lastDate, currentDate)) {
            currentRecord.live = true;
        }
    }

    const potentialNewLow = Math.abs(line.open - line.low);
    if (potentialNewLow > currentRecord.bestLow) {
        currentRecord.bestLow = potentialNewLow;
    }
    const potentialNewHigh = Math.abs(line.open - line.high);
    if (potentialNewHigh > currentRecord.bestHigh) {
        currentRecord.bestHigh = potentialNewHigh;
    }
    lastMinute = currentMinute;

    return currentRecord;
}