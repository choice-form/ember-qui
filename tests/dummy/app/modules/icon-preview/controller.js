import Controller from 'ember-controller';
import Clipboard from 'clipboard';

export default Controller.extend({
  hrefText: '',

  init() {
    this._super(...arguments);

    const self = this;
    new Clipboard(document.body, {
      text() { return self.get('hrefText').replace('#', '') }
    })
  },

  actions: {
    showHref(event) {
      this.set('hrefText', event.target.querySelector('use').getAttribute('xlink:href'));
    },

    hideHref() {
      this.set('hrefText', '');
    }
  }
});
