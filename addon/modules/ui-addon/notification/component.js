import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { get } from '@ember/object';
import { set } from '@ember/object';

export default Component.extend({
  layout,

  attributeBindings: ['style'],
  classNames: ['ui-notification'],
  classNameBindings: ['positionClassName'],
  localClassNames: ['container'],

  position: 'top',
  positionClassName: computed('position', function() {
    // TODO: provide multi positions
    return get(this, `styles.${get(this, 'position')}`);
  }),

  actions: {
    close(instance) {
      this.notification.remove(instance);
    },

    pause(instance) {
      if (get(instance, 'remaining')) {
        set(instance, 'paused', true);
        this.notification.pause(instance);
      }
    },

    resume(instance) {
      if (get(instance, 'remaining')) {
        set(instance, 'paused', false);
        this.notification.start(instance);
      }
    }
  }
});
