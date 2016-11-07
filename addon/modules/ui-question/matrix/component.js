import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed from 'ember-computed';

import $ from 'jquery';


export default Component.extend({
  layout,

  classNameBindings: ['classname'],
  classNames:['ui-matrix'],

  attributeBindings:['data-render-id'],
  'data-render-id': computed.oneWay('node.renderId'),

  actions: {

    handleOptionClick(option){
      console.log(option);
      this.handleEvents.handleOptionClick(option,get(this,'node'));
    },

    handleOptionInput(e){
      const value = e.target.value;
      set(this, 'option.value', value);
      this.handleEvents.handleOptionInput(get(this, 'option'),get(this,'node'));
    },
  },

  didInsertElement(){
    $(".flickity-column").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    });
    /*this.slick = new Slick('.flickity-column', {
      slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    });*/

  },

  didDestroyElement(){

  }

}).reopenClass({ positionalParams: ['node', 'handleEvents']});
