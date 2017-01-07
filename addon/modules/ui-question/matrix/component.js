import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { scheduleOnce } from 'ember-runloop';
import computed, { gt, and, reads } from 'ember-computed';
import $ from 'jquery';
import device from 'device';
import matirxSetHeight, { swiperHeaderInit, swiperMatrixInit } from '../../lib/matirx-factory';

export default Component.extend({
  layout,
  classNames: ['ui-matrix'],

  attributeBindings: ['data-render-id'],
  'data-render-id': reads('node.renderId'),

  resizeIcon: computed(() => 'stretch'),
  wrapperClassNames: computed('resizeIcon', function() {
    return `matrix-wrapper${get(this, 'resizeIcon') === 'pinch' ? ' zoom' : ''}`;
  }).readOnly(),

  hasMoreEnoughOptionsX: gt('node.renderOptionsX.length', 3),
  advancedControlNeeded: and('isDesktop', 'hasMoreEnoughOptionsX'),

  swiperEffect(isStretch){
    if (this.element) {
      const columnLength = get(this, 'node.renderOptionsX').length;
      const fixHeader = this.element.querySelector('.fix-header');
      const columnList = this.element.querySelector('.column-container');
      const matrixThumbnails = $(this.element.querySelector('.matrix-thumbnail-wrapper')).find('ul');

      this.fixHeader = swiperHeaderInit(fixHeader, isStretch, columnLength);

      this.swiper = swiperMatrixInit(get(this, 'isDesktop'), columnList, matrixThumbnails, isStretch,()=>{
        matirxSetHeight.call(this);
      },columnLength);
      !get(this, 'isDesktop') && this.swiper.disableTouchControl();
      this.swiper.params.control = this.fixHeader;
    }
  },

  deviceChangeSwiper(e){
    this.swiper && this.swiper.destroy(true, true);
    this.fixHeader && this.fixHeader.destroy(true, true);
    set(this, 'advancedControlNeeded', e.detail.device=='desktop' ? true : false);
    this.swiperEffect();
  },

  orientationChangeSwiper(){
    this.swiper && this.swiper.destroy(true, true);
    this.fixHeader && this.fixHeader.destroy(true, true);
    this.swiperEffect();
  },

  init() {
    this._super(...arguments);
    this.isDesktop = device.desktop();
  },

  didInsertElement() {
    scheduleOnce('afterRender', this, 'swiperEffect');
    if (get(this, 'isDesktop')) {
      window.addEventListener('resize', () => matirxSetHeight.call(this));
    }
    if(!get(this, 'preview')) return;

    window.addEventListener('device_change', (e) => this.deviceChangeSwiper(e));
    window.addEventListener('orientation_change', () => this.orientationChangeSwiper());
  },

  willDestroyElement(){
    this.swiper && this.swiper.destroy(true, true);
    this.fixHeader && this.fixHeader.destroy(true, true);
    window.removeEventListener('resize', matirxSetHeight);
    if(!get(this, 'preview')) return;
    window.removeEventListener('device_change', this.deviceChangeSwiper);
    window.removeEventListener('orientation_change', this.orientationChangeSwiper);
  },

  actions: {
    resizeMatrix() {
      this.swiper && this.swiper.destroy(true, true);
      this.fixHeader && this.fixHeader.destroy(true, true);

      const isStretch = 'stretch' === get(this, 'resizeIcon');
      set(this, 'resizeIcon', isStretch ? 'pinch' : 'stretch');

      scheduleOnce('afterRender', this, this.swiperEffect, isStretch);
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
