const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const AddonOptions = require('./index.js').options;
const options = {
  cssModules: AddonOptions.cssModules,
  nodeAssets: Object.assign({}, AddonOptions.nodeAssets, {
    'faker': {
      srcDir: 'build/build',
      import: ['faker.js']
    },
    'clipboard': {
      import: ['dist/clipboard.js']
    }
  })
};

module.exports = function(defaults) {
  const app = new EmberAddon(defaults, options);
  app.import('vendor/shims/faker.js');
  app.import('vendor/shims/clipboard.js');
  return app.toTree();
};
