import { processLine } from './line-processor'

describe('line processing', () => {

    it('should set a new high on the first tick', () => {

        let line = { dateTime: '2001-01-02T23:01', open: 17, low: 10, high: 20 };

        const { newLine, bestHigh, bestLow } = processLine(line, 15);

        expect(bestHigh).toBe(3);
        expect(bestLow).toBe(7);

    })

    it('should set a new high and low on the second tick', () => {

        processLine({ dateTime: '2001-01-02T23:01', open: 17, low: 10, high: 20 }, 15);

        const { newLine, bestHigh, bestLow } =
            processLine({ dateTime: '2001-01-02T23:02', open: 17, low: 8, high: 22 }, 15);

        expect(bestHigh).toBe(5);
        expect(bestLow).toBe(9);

    })


})