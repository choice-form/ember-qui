import Controller from 'ember-controller';
import Clipboard from 'clipboard';

export default Controller.extend({
  hrefText: '',

  actions: {
    showHref(event) {
      this.set('hrefText', event.target.querySelector('use').getAttribute('xlink:href'));
    },

    hideHref() {
      this.set('hrefText', '');
    },

    copyHref() {
      const result = this.get('hrefText').replace('#', '');
      this.clipboard = new Clipboard(document.body, {
        text() { return result }
      });
      // this.notification.success(`Copy to clipboard:&nbsp;<strong>${result}</strong>`);
    }
  }
});
