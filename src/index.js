import 'dotenv/config';
import { execute } from './file-processor';


const argv = require('minimist')(process.argv.slice(2));
console.dir(argv);

console.log(argv.timePeriod);

async function go() {
    return await execute(argv.in, argv.out, argv.timePeriod);
}

const result = go();

result.then(console.log);