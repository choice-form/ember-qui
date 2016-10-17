const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const AddonOptions = require('./index.js').options;
const options = {
  cssModules: AddonOptions.cssModules,
  nodeAssets: Object.assign({}, AddonOptions, {
    // other npm modules
  })
};

module.exports = function(defaults) {
  const app = new EmberAddon(defaults, options);
  return app.toTree();
};
