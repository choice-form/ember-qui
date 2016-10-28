var RSVP = require('rsvp');
var blueprintOptions = { saveDev: true };

module.exports = {
  name: 'ember-cform-ui',
  description: 'install all dependencies',

  normalizeEntityName() {},

  afterInstall() {
    return RSVP.all([
      this.addBowerPackageToProject('devicejs'),
      this.addAddonToProject('ember-cli-node-assets', { blueprintOptions })
    ]);
  }
};
