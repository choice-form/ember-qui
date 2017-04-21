import Component from 'ember-component';
import layout from './template';
import {scheduleOnce, later} from 'ember-runloop';
import Swiper from 'swiper';

export default Component.extend({
  layout,
  classNames: ['header-swiper'],

  contentSlide(){
    later(()=>{
      const content = this.element.querySelector('.header-container');
      this.swiper = new Swiper(content, {
        pagination: '.header-pagination',
        spaceBetween: 0,
        autoplay: 2500,
        loop: true,
        autoplayDisableOnInteraction: false
      });
    },0);
  },

  didInsertElement(){
    scheduleOnce('afterRender', this, 'contentSlide');
  },

  willDestroyElement(){
    this.swiper && this.swiper.destroy(true, true);
  },

});
