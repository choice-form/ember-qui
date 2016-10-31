var RSVP = require('rsvp');
var blueprintOptions = { saveDev: true };

module.exports = {
  name: 'ember-cform-ui',
  description: 'install all dependencies',

  normalizeEntityName() {},

  afterInstall() {
    return RSVP.all([
      this.addPackageToProject('fastclick'),
      this.addPackageToProject('masonry-layout'),
      this.addPackageToProject('less-plugin-autoprefix'),
      this.addBowerPackageToProject('devicejs'),
      this.addAddonToProject('ember-cli-node-assets', { blueprintOptions })
    ]);
  }
};
