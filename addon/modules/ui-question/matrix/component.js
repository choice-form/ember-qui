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
      this.handleEvents.handleOptionClick(option,get(this,'node'));
    },

    handleOptionInput(e){
      const value = e.target.value;
      set(this, 'option.value', value);
      this.handleEvents.handleOptionInput(get(this, 'option'),get(this,'node'));
    },
  },

  didInsertElement(){
    const flickityColumn = this.element.getElementsByClassName('flickity-column')[0];
    const fixHeader = this.element.getElementsByClassName('fix-header')[0];

    $(flickityColumn).slick({
      infinite:false,
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: fixHeader,
    });
    $(fixHeader).slick({
      infinite:false,
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: flickityColumn,
    });

  },

  didDestroyElement(){

  }

}).reopenClass({ positionalParams: ['node', 'handleEvents']});
