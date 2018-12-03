import 'dotenv/config';
import { execute } from './file-processor';

const argv = require('minimist')(process.argv.slice(2));

const input = `data/${argv.symbol}.csv`;
const output = `out/${argv.symbol}-OUT.csv`;

async function go() {
    return await execute(input, output, argv.timePeriod);
}

const result = go();

result.then(console.log);