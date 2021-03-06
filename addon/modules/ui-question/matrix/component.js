import { computed, set, setProperties } from '@ember/object';
import { device } from 'device';
import { gt, and, reads } from '@ember/object/computed';
import { scheduleOnce } from '@ember/runloop';
import $ from 'jquery';
import Component from '@ember/component';

import layout from './template';

import matrixSetHeight, {
  swiperHeaderInit,
  swiperMatrixInit,
} from '../../lib/matrix-factory';

export default Component.extend({
  layout,
  classNames: ['ui-matrix'],

  attributeBindings: ['data-render-id'],
  'data-render-id': reads('node.renderId'),

  resizeIcon: computed(() => 'stretch'),
  wrapperClassNames: computed('resizeIcon', function() {
    return `matrix-wrapper${this.resizeIcon === 'pinch' ? ' zoom' : ''}`;
  }).readOnly(),

  hasAdvancedButton: gt('node.renderOptionsX.length', 3),
  moreButtonNeeded: and('isDesktop', 'hasAdvancedButton'),

  hasArrowButton: gt('node.renderOptionsX.length', 2),
  arrowButtonNeeded: and('isDesktop', 'hasArrowButton'),

  needFixMatrix: computed('node.fixMatrixHead', function() {
    return this.node.fixMatrixHead && this.node.fixTop > 0;
  }),

  swiperEffect(isStretch) {
    isStretch = isStretch || this.node.isDoubleGrid;
    if (this.element) {
      const columnLength = this.node.renderOptionsX.length;
      const fixHeader = this.element.querySelector('.fix-header');
      const columnList = this.element.querySelector('.column-container');
      const matrixThumbnails = $(
        this.element.querySelector('.matrix-thumbnail-wrapper')
      ).find('ul');

      this.fixHeader = swiperHeaderInit(fixHeader, isStretch, columnLength);

      this.swiper = swiperMatrixInit(
        this.isDesktop,
        columnList,
        matrixThumbnails,
        isStretch,
        () => {
          matrixSetHeight.call(this);
        },
        columnLength
      );
      this.swiper.controller.control = this.fixHeader;
    }
  },

  deviceChangeSwiper(e) {
    this.swiper && this.swiper.destroy(true, true);
    this.fixHeader && this.fixHeader.destroy(true, true);
    setProperties(this, {
      moreButtonNeeded: e.detail.device === 'desktop',
      arrowButtonNeeded: e.detail.device === 'desktop',
    });
    this.swiperEffect();
  },

  orientationChangeSwiper() {
    this.swiper && this.swiper.destroy(true, true);
    this.fixHeader && this.fixHeader.destroy(true, true);
    this.swiperEffect();
  },

  init() {
    this._super(...arguments);
    this.isDesktop = device.desktop;
  },

  didInsertElement() {
    scheduleOnce('afterRender', this, 'swiperEffect');
    if (this.isDesktop) {
      // todo 绑定无法成功解除
      window.addEventListener('resize', () => matrixSetHeight.call(this));
    }
    if (!this.preview) return;

    window.addEventListener('device_change', e => this.deviceChangeSwiper(e));
    window.addEventListener('orientation_change', () =>
      this.orientationChangeSwiper()
    );
  },

  willDestroyElement() {
    this.swiper && this.swiper.destroy(true, true);
    this.fixHeader && this.fixHeader.destroy(true, true);
    window.removeEventListener('resize', matrixSetHeight);
    if (!this.preview) return;
    window.removeEventListener('device_change', this.deviceChangeSwiper);
    window.removeEventListener(
      'orientation_change',
      this.orientationChangeSwiper
    );
  },

  actions: {
    resizeMatrix() {
      this.swiper && this.swiper.destroy(true, true);
      this.fixHeader && this.fixHeader.destroy(true, true);
      const isStretch = 'stretch' === this.resizeIcon || this.node.isDoubleGrid;
      set(this, 'resizeIcon', isStretch ? 'pinch' : 'stretch');

      scheduleOnce('afterRender', this, this.swiperEffect, isStretch);
    },

    handleOptionClick(option, e) {
      !this.handleEvents.handleOptionClick(option, this.node) &&
        e.preventDefault();
    },

    handleOptionInput(e) {
      const value = e.currentTarget.value;
      this.handleEvents.handleOptionInput(value, this.option, this.node);
    },

    handleOptionInputForTextarea(e) {
      const value = e.currentTarget.value;
      this.handleEvents.handleOptionInput(value, this.option, this.node);
      e.currentTarget.style.height = e.currentTarget.scrollHeight + 2 + 'px';
    },
  },
}).reopenClass({ positionalParams: ['node', 'handleEvents'] });
