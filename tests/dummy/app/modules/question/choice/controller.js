import Controller from '@ember/controller';

export default Controller.extend({
  init() {
    this._super(...arguments);
    // this.notification.warning('<strong>This is an example message!!!</strong>', {
    //   autoClear: 500000
    // });
  },

  actions: {
    toggle() {
      return window.confirm('Are you sure?');
    }
  }
});
