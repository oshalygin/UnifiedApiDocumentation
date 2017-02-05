import generator from './generator.js';
import path from 'path';

const users = path.join(__dirname, '../specs/users.d/users.raml');
generator.single(users, 'foobaz');
