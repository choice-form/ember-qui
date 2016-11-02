import Component from 'ember-component';
import layout from './template';
import set from 'ember-metal/set';

export default Component.extend({
  layout,
  tagName:'',
  actions: {
    handleClick() {
      set(this, 'currency', true)
    }
  }
}).reopenClass({ positionalParams: ['node'] });
