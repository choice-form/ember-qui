import Component from '@ember/component';
import layout from './template';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import { scheduleOnce, later } from '@ember/runloop';
import Swiper from 'swiper';

export default Component.extend({
  layout,
  classNames: ['header-swiper'],

  swiper: inject(),

  contentSlide() {
    later(()=>{
      const content = this.element.querySelector('.header-container');
      this.swiperInstance = new Swiper(content, {
        pagination: '.header-pagination',
        spaceBetween: 0,
        autoplay: get(this, 'header.imgTransTime'),
        loop: true,
        effect: get(this, 'header.imgTransType'),
        autoplayDisableOnInteraction: false
      });

      let swiperService = get(this, 'swiper');
      swiperService.register(get(this, 'swiperName'), this.swiperInstance);
    },0);
  },

  didInsertElement(){
    scheduleOnce('afterRender', this, 'contentSlide');
  },

  willDestroyElement(){
    this.swiperInstance && this.swiperInstance.destroy(true, true);
  },
});
