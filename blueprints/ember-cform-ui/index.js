var RSVP = require('rsvp');

module.exports = {
  name: 'ember-cform-ui',
  description: 'install all dependencies',

  normalizeEntityName() {},

  afterInstall() {
    return RSVP.all([
      // Build same style system for consuming applications
      this.addAddonToProject({ name: 'ember-css-modules' }),
      this.addPackagesToProject([
        {name: 'postcss-browser-reporter'},
        {name: 'postcss-cssnext'},
        {name: 'postcss-extend'},
        {name: 'postcss-fallback'},
        {name: 'postcss-import'},
        {name: 'postcss-sassy-mixins'},
        {name: 'rucksack-css'},
      ])
    ]);
  }
};
