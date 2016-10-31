var RSVP = require('rsvp');
var blueprintOptions = { saveDev: true };

module.exports = {
  name: 'ember-cform-ui',
  description: 'install all dependencies',

  normalizeEntityName() {},

  afterInstall() {
    return RSVP.all([
      this.addPackageToProject('fastclick'),
      this.addBowerPackageToProject('device.js'),
      this.addAddonToProject('ember-cli-node-assets', { blueprintOptions })
    ]);
  }
};
