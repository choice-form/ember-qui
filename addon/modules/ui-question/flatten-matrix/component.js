import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set, {setProperties} from 'ember-metal/set';
import {scheduleOnce} from 'ember-runloop';
import {gt, and, reads} from 'ember-computed';

export default Component.extend({
  layout,
  classNames: ['ui-flatten-matrix'],

  attributeBindings: ['data-render-id'],
  'data-render-id': reads('node.renderId'),

  actions: {

    handleOptionClick(option, e){
      !this.handleEvents.handleOptionClick(option, get(this, 'node'))
      && e.preventDefault();
    },

    handleOptionInput(e){
      const value = e.currentTarget.value;
      this.handleEvents.handleOptionInput(value, get(this, 'option'), get(this, 'node'));
    },

    handleOptionInputForTextarea(e){
      const value = e.currentTarget.value;
      this.handleEvents.handleOptionInput(value, get(this, 'option'), get(this, 'node'));
      e.currentTarget.style.height = e.currentTarget.scrollHeight + 2 + 'px';
    },

  },


}).reopenClass({positionalParams: ['node', 'handleEvents']});
