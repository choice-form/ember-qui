import Component from 'ember-component';
import layout from './template';
import computed, { reads } from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { scheduleOnce, later } from 'ember-runloop';
import device from 'device';
import $ from 'jquery';
import matirxSetHeight, { swiperHeaderInit, swiperMatrixInit } from '../../lib/matirx-factory';

export default Component.extend({
  layout,
  classNames: ['ui-matrix'],

  attributeBindings: ['data-render-id'],
  'data-render-id': reads('node.renderId'),

  resizeIcon: computed(() => 'stretch'),

  swiperEffect(slidesNum){
    if (this.element) {
      const fixHeader = this.element.querySelector('.fix-header');
      const columnList = this.element.querySelector('.column-container');
      const matrixThumbnails = $(this.element.querySelector('.matrix-thumbnail-wrapper')).find('ul');

      this.fixHeader = swiperHeaderInit(fixHeader, {
        slidesPerView: slidesNum,
      });

      this.swiper = swiperMatrixInit(columnList, matrixThumbnails, {
        slidesPerView: slidesNum,
      },()=>{
        matirxSetHeight.call(this);
      });
      !device.desktop() && this.swiper.disableTouchControl();
      this.swiper.params.control = this.fixHeader;
    }
  },

  didInsertElement(){
    scheduleOnce('afterRender',this,'swiperEffect', device.desktop() ? 2 : 1);

    if (device.desktop()) {
      window.onresize = ()=> {
        matirxSetHeight.call(this);
      };
    }
  },

  willDestroyElement(){
    this.swiper && this.swiper.destroy(true, true);
    this.fixHeader && this.fixHeader.destroy(true, true);
  },

  actions: {
    matrixResize() {
      const resizeIcon = get(this, 'resizeIcon');
      this.swiper.destroy(true, true);
      this.fixHeader.destroy(true, true);

      if (resizeIcon == 'stretch') {
        set(this, 'resizeIcon', 'pinch');
        later(()=>{
          this.swiperEffect(4);
        }, 100);
      } else {
        set(this, 'resizeIcon', 'stretch');
        later(()=>{
          this.swiperEffect(device.desktop() ? 2 : 1);
        },100)
      }
    },

    handleOptionClick(option,e){
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
}).reopenClass({ positionalParams: ['node', 'handleEvents'] });
