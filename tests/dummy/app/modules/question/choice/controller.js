import Controller from 'ember-controller';
import { later } from 'ember-runloop';

export default Controller.extend({
  init() {
    this.notification.info('<strong>This is an example message!!!</strong>', {
      autoClear: 0
    });


    this._super(...arguments);
  },

  actions: {
    toggle() {
      return window.confirm('Are you sure?');
    }
  }
});
