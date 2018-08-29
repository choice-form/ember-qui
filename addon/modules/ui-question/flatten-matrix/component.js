import { get, set } from '@ember/object';
import { reads } from '@ember/object/computed';
import Component from '@ember/component';
import { device } from 'device';

import layout from './template';

export default Component.extend({
  layout,
  classNames: ['ui-flatten-matrix'],

  attributeBindings: ['data-render-id'],
  'data-render-id': reads('node.renderId'),

  clientWidth: window.innerWidth,

  init(){
    this._super(...arguments);
    device.desktop() && window.addEventListener('resize', () => {
      set(this, 'clientWidth', window.innerWidth);
    });
  },

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
