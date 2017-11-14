import Component from 'ember-component';
import layout from './template';
import computed, {reads} from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Component.extend({
  layout,
  classNames: ['ui-range'],

  attributeBindings: ['data-render-id'],
  'data-render-id': reads('option.renderId'),

  displayValue: computed('option.value', {
    get() { return get(this, 'option.value') },
    set(key, value) { return value }
  }),

  init(){
    this._super(...arguments);
    const {option: {minValue, maxValue}} = this;
    if(minValue >= 0){
      this.connect = [true, false];
    }else if(maxValue <= 0){
      this.connect = [false, true];
    }else{
      this.connect = [false, false];
    }
  },

  actions: {
    updateDisplayValue(values, handle) {
      set(this, 'displayValue', Math.round(values[handle]))
    },

    handleOptionInput(value){
      this.handleEvents.handleOptionInput(
        Math.round(value), get(this, 'option'), get(this, 'node')
      );
    },

    handleOptionInputForTextarea({currentTarget: target}){
      this.handleEvents.handleOptionInput(
        target.value, get(this, 'option'), get(this, 'node')
      );

      target.style.height = 'auto';
      target.style.height = target.scrollHeight + 2 + 'px';
    }
  }
}).reopenClass({positionalParams: ['node', 'option', 'handleEvents']});
