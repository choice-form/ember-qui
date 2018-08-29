import Component from '@ember/component';
import layout from './template';
import { reads } from '@ember/object/computed';
import Swiper from 'swiper';

export default Component.extend({
  layout,
  classNames: ['ui-slide'],
  attributeBindings:['data-render-id'],
  'data-render-id': reads('renderId'),

  classNameBindings: ['className'],
  className: "",

  didInsertElement(){
    const swiperContainer = this.element.querySelector('.swiper-container')
    this.swiper = new Swiper(swiperContainer, {
      paginationClickable: true,
      pagination: '.swiper-pagination',
      direction: 'vertical'
    });
  }

});
