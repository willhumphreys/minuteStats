import { execute } from './file-processor';
import { readFile } from 'fs';
const fs = require('fs');

test('execute process', async () => {

    const result = await execute('test-data/AUDUSD.csv', 'test-out/AUDUSD.csv', 15);

    expect(result).toBe('complete');

    const expectedLines = ['date,bestLow,bestHigh',
        '2001-01-02T23:01:00.000Z,1000,2000',
        '2001-01-02T23:15:00.000Z,1000,2000',
        '2001-01-02T23:33:00.000Z,1000,2000',
        '2001-01-02T23:46:00.000Z,1000,2000',
        '2001-01-03T00:01:00.000Z,1000,2000',
        '2001-01-03T00:16:00.000Z,1000,2000'
    ]

    const input = 'test-out/AUDUSD.csv';

    const data = fs.readFileSync('test-out/AUDUSD.csv', 'utf8');

    const lines = data.split('\n');

    expect(lines.length).toBe(7);
    lines.map((line, index) => expect(line).toBe(expectedLines[index]));

})