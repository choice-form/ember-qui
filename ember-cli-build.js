'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  const app = new EmberAddon(defaults, {
  });

  app.import('node_modules/faker/build/build/faker.js', {
    using: [{ transformation: 'amd', as: 'faker' }]
  });
  app.import('node_modules/clipboard/dist/clipboard.js', {
    using: [{ transformation: 'amd', as: 'clipboard' }]
  });

  return app.toTree();
};
