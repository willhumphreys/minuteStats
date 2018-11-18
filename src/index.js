import 'dotenv/config';
import { execute } from './file-processor';
const fs = require('fs')

execute(fs, process.env.in, process.env.out);