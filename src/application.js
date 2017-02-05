import generator from './generator.js';
import path from 'path';

const helloWorld = path.join(__dirname, '../specs/helloworld.d/helloworld.raml');
generator.single(helloWorld, 'foobaz');
