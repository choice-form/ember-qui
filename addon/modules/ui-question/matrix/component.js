import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { reads } from 'ember-computed';
import Swiper from 'swiper';

export default Component.extend({
  layout,

  classNames: ['ui-matrix'],
  classNameBindings: ['classname'],

  attributeBindings: ['data-render-id'],
  'data-render-id': reads('node.renderId'),

  actions: {
    handleOptionClick(option){
      this.handleEvents.handleOptionClick(option, get(this, 'node'));
    },

    handleOptionInput(e){
      set(this, 'option.value', e.target.value);
      this.handleEvents.handleOptionInput(get(this, 'option'), get(this, 'node'));
    },
  },

  didInsertElement(){
    const columnList = this.element.querySelector('.flickity-column');

    this.swiper = new Swiper(columnList, {
      direction: 'vertical',
      loop: true
    });
  },

  willDestroyElement(){
    this.swiper.destroy(true, true);
  }
}).reopenClass({positionalParams: ['node', 'handleEvents']});
