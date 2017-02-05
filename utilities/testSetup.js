/* eslint-disable no-process-env */
require('babel-register')({
  plugins: ['rewire']
});

process.env.NODE_ENV = 'test'; 

['.scss', '.png', '.jpg', '.raml'].forEach((extension) => {
  require.extensions[extension] = () => null;
});

const jsdom = require('jsdom').jsdom;
const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.localStorage = {
  getItem() {
  },
  setItem() {
  }
};

global.navigator = {
  userAgent: 'node.js'
};
