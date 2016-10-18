const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const AddonOptions = require('./index.js').options;
const options = {
  cssModules: AddonOptions.cssModules,
  nodeAssets: Object.assign({}, AddonOptions.nodeAssets, {
    'faker': {
      srcDir: 'build/build',
      import: ['faker.js']
    }
  })
};

module.exports = function(defaults) {
  const app = new EmberAddon(defaults, options);
  app.import('vendor/shims/faker.js');
  return app.toTree();
};
