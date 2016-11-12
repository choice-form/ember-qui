var RSVP = require('rsvp');
var blueprintOptions = { saveDev: true };

module.exports = {
  name: 'ember-cform-ui',
  description: 'install all the dependencies that q.cform.io requires',

  normalizeEntityName() {},

  afterInstall() {
    return RSVP.all([
      this.addBowerPackageToProject('devicejs'),
      this.addBowerPackageToProject('nouislider'),
      this.addPackageToProject('bowser'),
      this.addPackageToProject('fastclick'),
      this.addPackageToProject('imagesloaded'),
      this.addPackageToProject('less-plugin-autoprefix'),
      this.addPackageToProject('masonry-layout'),
      this.addPackageToProject('sortablejs'),
      this.addPackageToProject('swiper'),
      this.addAddonsToProject({
        packages: [
          { name: 'ember-cli-less', target: '^1.5.3' }
        ],
        blueprintOptions
      })
    ]);
  }
};
