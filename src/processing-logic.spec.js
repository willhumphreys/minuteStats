import { invalidGap } from './processing-logic';

describe('timeDiff', () => {
    it('timeDiff is not invalid if date is within one hour', () => {

        const date = new Date('1995-12-17T03:24:00');
        const date2 = new Date('1995-12-17T03:30:00');

        expect(invalidGap(date, date2)).toBe(false);
    })

    it('timeDiff is not invalid if date is within one hour', () => {

        const date = new Date('1995-12-17T03:24:00');
        const date2 = new Date('1995-12-17T04:30:00');

        expect(invalidGap(date, date2)).toBe(true);
    })


})