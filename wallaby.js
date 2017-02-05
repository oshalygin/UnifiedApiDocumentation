module.exports = function (wallaby) {

  return {
    files: [
      'src/**/*.js*',
      '!src/**/*.json',
      '!src/**/*.raml',
      '!src/**/*.spec.js*'
    ],

    tests: [
      'src/**/*.spec.js'
    ],
    env: {
      type: 'node',
      params: {
        env: 'NODE_ENV=test'
      }
    },
    compilers: {
      '**/*.js*': wallaby.compilers.babel({
        presets: ['es2015'],
        plugins: ['transform-object-rest-spread', 'rewire']
      })
    },

    // Toggle when you experience caching issues

    // workers: {
    //   recycle: true
    // },

    setup: function () { //eslint-disable-line object-shorthand

      const noop = () => { };

      require.extensions['.css'] = noop;
      require.extensions['.ico'] = noop;
      require.extensions['.png'] = noop;
      require.extensions['.svg'] = noop;

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
        getItem() { },
        setItem() { }
      };

      global.navigator = {
        userAgent: 'node.js'
      };

      documentRef = document; //eslint-disable-line no-undef
    }
  };
};
