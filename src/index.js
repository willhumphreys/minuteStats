import 'dotenv/config';
import { execute } from './file-processor';


async function go() {
    return await execute(process.env.in, process.env.out);
}

const result = go();

result.then(console.log);