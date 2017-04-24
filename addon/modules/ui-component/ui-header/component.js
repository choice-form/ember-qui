import Component from 'ember-component';
import layout from './template';
import inject from 'ember-service/inject';
import computed, { notEmpty, and, not } from 'ember-computed';
import get from 'ember-metal/get';
import { htmlSafe } from 'ember-string';
import {insertImg} from '../../lib/attribute-manage';

export default Component.extend({
  layout,
  tagName: '',

  swiper: inject(),

  imageTop: computed('header', function() {
    return ['intro-page', 'end-page'].indexOf(get(this, 'header.quesType')) > -1
  }),
  imageNormal: not('imageTop').readOnly(),

  hasImages: notEmpty('header.images').readOnly(),
  hasTopImages: and('hasImages', 'imageTop').readOnly(),
  hasNormalImages: and('hasImages', 'imageNormal').readOnly(),

  multiImages: computed('header.images', function () {
    return get(this ,'header.images').length > 1;
  }),

  singleImage: computed('multiImages', function() {
    if (!get(this, 'multiImages')) {
      return get(this, 'header.images.firstObject');
    } else {
      return null;
    }
  }).readOnly(),

  requiredMark: computed('header.asterisks', {
    get() {
      return get(this, 'header.asterisks')
        ? htmlSafe(`<span class="required-asterisk">*</span>`) : null;
    }
  }).readOnly(),

  quesNumber: computed('header.number', {
    get() {
      return get(this, 'header.number')
        ? htmlSafe(`<span class="question-number">${get(this, 'header.number')}.</span>`) : null;
    }
  }).readOnly(),

  description: computed('header.description', {
    get() {
      const description = get(this, 'header.description');
      return description ? htmlSafe(`<pre class="description">${insertImg(description)}</pre>`) : null;
    }
  }).readOnly(),

  openPhotoSwipe(header, trigger, options = {}) {
    let pswpElement = document.querySelector('.pswp');

    if (!options.getThumbBoundsFn) {
      options.getThumbBoundsFn = function(/*index*/) {
        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
        let {left, top, width} = trigger.getBoundingClientRect();
        return {x: left, y: top + pageYScroll, w: width};
      }
    }

    let items = header.images.map(item => ({
      msrc: item.natural,
      src: item.large,
      w: item.width,
      h: item.height,
      title: header.title
    }));

    this.photoSwiper = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    this.photoSwiper.init();
  },

  actions: {
    openPhotoSwipe() {
      if (get(this, 'header.imgScale')) {
        // 开始处理 PhotoSwipe
        let swiperService = get(this, 'swiper');
        let swiperInstance = swiperService.resolve('header');
        let index = swiperInstance ? swiperInstance.activeIndex - 1 : 0;
        this.openPhotoSwipe(get(this, 'header'), event.target.parentNode, {
          index,
          tapToClose: true,
          maxSpreadZoom: 4,
          history: false,
          showHideOpacity: false,
          shareEl: false,
          fullscreenEl: false,
        });
      } else return;
    }
  }
}).reopenClass({positionalParams: ['header']});

/**
 * UiHeaderComponent
 *
 ``` javascript
 {{ui-component/ui-header intro imageTop=true}}
 ```
 *
 * @class UiHeaderComponent
 */

/**
 * header
 *
 * @property {Object} header
 * @property {Array} header.images - header的图片
 * @example
 ```javascript
 image:{
      ratio: image.ratio,
      thumbnail: image.thumbnail,
      image: image.natural,
 }
 ```
 * @property {Bool} header.asterisks - 是否必选
 * @property {Number} header.number - 当前是第几题
 * @property {String} header.title - 问卷标题
 * @property {String} header.description - 问卷描述
 */
