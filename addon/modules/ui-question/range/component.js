import Component from 'ember-component';
import layout from './template';
import { reads } from 'ember-computed';
import get from 'ember-metal/get';

export default Component.extend({
  layout,
  classNames: ['ui-range'],

  attributeBindings: ['data-render-id'],
  'data-render-id': reads('option.renderId'),

  actions: {
    handleOptionInput(valueOrEvent){
      const value = valueOrEvent.currentTarget
            ? valueOrEvent.currentTarget.value
            : window.parseInt(valueOrEvent, 10);

      this.handleEvents.handleOptionInput(
        value, get(this, 'option'), get(this,'node')
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
