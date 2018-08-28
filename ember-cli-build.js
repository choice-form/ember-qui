/* eslint-env node */
'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const AddonOptions = require('./index.js').options;

module.exports = function(defaults) {
  const app = new EmberAddon(defaults, {
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
  });
  app.import('vendor/shims/faker.js');
  app.import('vendor/shims/clipboard.js');
  return app.toTree();
};
