import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { scheduleOnce, later } from 'ember-runloop';
import computed, { gt, and, reads } from 'ember-computed';
import $ from 'jquery';
import device from 'device';
import matirxSetHeight, { swiperHeaderInit, swiperMatrixInit } from '../../lib/matirx-factory';

export default Component.extend({
  layout,
  classNames: ['ui-matrix'],

  device: '',

  attributeBindings: ['data-render-id'],
  'data-render-id': reads('node.renderId'),

  resizeIcon: computed(() => 'stretch'),
  wrapperClassNames: computed('resizeIcon', function() {
    return `matrix-wrapper${get(this, 'resizeIcon') === 'pinch' ? ' zoom' : ''}`;
  }).readOnly(),

  hasMoreEnoughOptionsX: gt('node.renderOptionsX.length', 3),
  advancedControlNeeded: and('isDesktop', 'hasMoreEnoughOptionsX'),

  swiperEffect(slidesNum){
    if (this.element) {
      const fixHeader = this.element.querySelector('.fix-header');
      const columnList = this.element.querySelector('.column-container');
      const matrixThumbnails = $(this.element.querySelector('.matrix-thumbnail-wrapper')).find('ul');

      this.fixHeader = swiperHeaderInit(fixHeader, {
        slidesPerView: slidesNum,
      });

      this.swiper = swiperMatrixInit(get(this, 'isDesktop'), columnList, matrixThumbnails, {
        slidesPerView: slidesNum,
      },()=>{
        matirxSetHeight.call(this);
      });
      !get(this, 'isDesktop') && this.swiper.disableTouchControl();
      this.swiper.params.control = this.fixHeader;
    }
  },

  deviceChangeSwiper(e){
    const device = e.detail.device;
    if(get(this, 'device') == device) return ;
    this.swiper && this.swiper.destroy(true, true);
    this.fixHeader && this.fixHeader.destroy(true, true);
    this.swiperEffect(device=='desktop' ? 2 : 1);
    set(this,'device', device);
  },

  init() {
    this._super(...arguments);
    this.isDesktop = device.desktop();
  },

  didInsertElement(){
    this._super(...arguments);
    scheduleOnce('afterRender',this,'swiperEffect', get(this, 'isDesktop') ? 2 : 1);
    if (get(this, 'isDesktop')) {
      window.onresize = ()=> {
        matirxSetHeight.call(this);
      };
    }
    window.addEventListener('device_change', e => this.deviceChangeSwiper(e));
  },

  willDestroyElement(){
    this.swiper && this.swiper.destroy(true, true);
    this.fixHeader && this.fixHeader.destroy(true, true);
    window.removeEventListener('device_change', this.deviceChangeSwiper);
  },

  actions: {
    resizeMatrix() {
      this.swiper && this.swiper.destroy(true, true);
      this.fixHeader && this.fixHeader.destroy(true, true);

      const isStretch = 'stretch' === get(this, 'resizeIcon');
      set(this, 'resizeIcon', isStretch ? 'pinch' : 'stretch');

      scheduleOnce('afterRender', this, this.swiperEffect, isStretch ? 4 : 2);
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
