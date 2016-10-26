import Controller from 'ember-controller';

export default Controller.extend({
  hrefText: '',

  actions: {
    showHref(event) {
      this.set('hrefText', event.target.querySelector('use').getAttribute('xlink:href'));
    },

    hideHref() {
      this.set('hrefText', '');
    },

    copyHref(event) {

    }
  }
});
