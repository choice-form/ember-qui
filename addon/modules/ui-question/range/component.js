import Component from 'ember-component';
import layout from './template';
import { reads } from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Component.extend({
  layout,
  classNames: ['ui-range'],

  attributeBindings: ['data-render-id'],
  'data-render-id': reads('option.renderId'),

  value:reads('option.value'),

  actions: {
    handleOptionInput(value){
      this.handleEvents.handleOptionInput(
        window.parseInt(value, 10), get(this, 'option'), get(this,'node')
      );
    },

    handleOptionUpdate(value){
      set(this, 'value', window.parseInt(value, 10));
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
