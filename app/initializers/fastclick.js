import { scheduleOnce } from 'ember-runloop';

export default {
  name: 'fastclick',

  initialize() {
    scheduleOnce('afterRender', () => {
      if (FastClick && document.body) {
        FastClick.attach(document.body);
      }
    });
  }
};
