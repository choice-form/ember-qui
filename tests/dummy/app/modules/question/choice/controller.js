import Controller from 'ember-controller';

export default Controller.extend({
  init() {
  /*  this.notification.warning('<strong>This is an example message!!!</strong>', {
      autoClear: 500000
    });
    this._super(...arguments);*/
  },

  actions: {
    toggle() {
      return window.confirm('Are you sure?');
    }
  }
});
