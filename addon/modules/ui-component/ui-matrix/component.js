import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import matirxSetHeight from '../../lib/matirxSetHeight';
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


    /**
     * onInput
     */

    handleOptionInput(e){
      const value = e.currentTarget.value;
      this.handleEvents.handleOptionInput(value, get(this, 'option'), get(this, 'node'));
    },


    /**
     * handleOptionInputForTextarea
     */

    handleOptionInputForTextarea(e){
      const value = e.currentTarget.value;
      this.handleEvents.handleOptionInput(value, get(this, 'option'), get(this, 'node'));

      e.currentTarget.style.height = '74px';
      e.currentTarget.style.height = e.currentTarget.scrollHeight + 2 + 'px';

    },

  },

  didInsertElement(){
    const fixHeader =  this.element.querySelector('.fix-header');
    const columnList = this.element.querySelector('.flickity-column');

    this.fixHeader = new Swiper(fixHeader, {
      slidesPerView: device.desktop() ? 2 : 1,
    });

    this.swiper = new Swiper(columnList, {
      slidesPerView: device.desktop() ? 2 : 1,
      paginationClickable: true,
      pagination: '.swiper-pagination',
    });



    this.fixHeader.params.control = this.swiper;
    this.swiper.params.control = this.fixHeader;

    matirxSetHeight.call(this);

    if(!device.desktop()) return ;

    window.onresize =()=>{
      matirxSetHeight.call(this);
    };

  },

  willDestroyElement(){
    this.swiper.destroy(true, true);
    this.fixHeader.destroy(true, true);
  }
}).reopenClass({positionalParams: ['node', 'handleEvents']});
