import Component from 'ember-component';
import layout from './template';
import computed, { reads } from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Component.extend({
  layout,
  classNames: ['ui-range'],

  attributeBindings: ['data-render-id'],
  'data-render-id': reads('option.renderId'),

  displayValue: computed('option.value', {
    get() { return get(this, 'option.value') ? get(this, 'option.value') : '-'},
    set(key, value) { return value }
  }),

  actions: {
    updateDisplayValue(values, handle) {
      set(this, 'displayValue', Math.round(values[handle]))
    },

    handleOptionInput(value){
      this.handleEvents.handleOptionInput(
        window.parseInt(value, 10), get(this, 'option'), get(this,'node')
      );
    },

    handleOptionInputForTextarea({ currentTarget: target }){
      this.handleEvents.handleOptionInput(
        target.value, get(this, 'option'), get(this, 'node')
      );

      target.style.height = 'auto';
      target.style.height = target.scrollHeight + 2 + 'px';
    }
  }
}).reopenClass({ positionalParams: ['node', 'option', 'handleEvents'] });
