/* eslint-env node */
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const AddonOptions = require('./index.js').options;
const options = {
  nodeAssets: Object.assign({}, AddonOptions.nodeAssets, {
    'faker': {
      srcDir: 'build/build',
      import: ['faker.js']
    },
    'clipboard': {
      srcDir: 'dist',
      import: ['clipboard.js']
    },
  })
};

module.exports = function(defaults) {
  const app = new EmberAddon(defaults, options);
  app.import('vendor/shims/faker.js');
  app.import('vendor/shims/clipboard.js');
  return app.toTree();
};
