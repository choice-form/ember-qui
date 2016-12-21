const RSVP = require('rsvp');

module.exports = {
  name: 'ember-cform-ui',
  description: 'install all the dependencies that q.cform.io requires',

  normalizeEntityName() {},

  afterInstall() {
    return RSVP.all([
      this.addBowerPackageToProject('devicejs'),
      this.addBowerPackageToProject('qrcode'),
      this.addPackageToProject('bowser'),
      this.addPackageToProject('fastclick'),
      this.addPackageToProject('masonry-layout'),
      this.addPackageToProject('sortablejs', '~1.4.2'),
      this.addPackageToProject('swiper'),
      this.addAddonsToProject({
        packages: [
          { name: 'ember-cli-less', target: '^1.5.3' },
          { name: 'ember-in-viewport', target: '^2.1.0' }
        ],
        blueprintOptions: { saveDev: true }
      })
    ]);
  }
};
