var RSVP = require('rsvp');
var blueprintOptions = { saveDev: true };

module.exports = {
  name: 'ember-cform-ui',
  description: 'install all dependencies',

  normalizeEntityName() {},

  afterInstall() {
    return RSVP.all([
      this.addPackagesToProject([
        {name: 'postcss-browser-reporter'},
        {name: 'postcss-cssnext'},
        {name: 'postcss-extend'},
        {name: 'postcss-fallback'},
        {name: 'postcss-import'},
        {name: 'postcss-sassy-mixins'},
        {name: 'rucksack-css'},
      ]),
      this.addAddonToProject('ember-cli-node-assets', { blueprintOptions }),
      this.addAddonToProject('ember-css-modules', { blueprintOptions })
    ]);
  }
};
