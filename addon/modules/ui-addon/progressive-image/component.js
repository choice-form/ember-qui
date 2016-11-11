import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import { htmlSafe } from 'ember-string';
import stackBlurImage from './stack-blur';
import { later } from 'ember-runloop';

export default Component.extend({
  layout,
  tagName: 'div',
  classNames: ['progressive-image'],
  classNameBindings: ['objectFit:object-fit'],

  objectFit: null,

  paddingElement: computed('ratio', 'objectFit', function() {
    if (get(this, 'objectFit')) {
      return htmlSafe(`<div style="padding-top: 100%;"></div>`);
    } else {
      const paddingTop = get(this, 'ratio') * 100;
      return htmlSafe(`<div style="padding-top: ${paddingTop}%;"></div>`);
    }
  }),

  adaptiveStyle: computed('ratio', 'objectFit', function() {
    const ratio = +get(this, 'ratio');
    const width = 100 / ratio;
    const type = get(this, 'objectFit');

    // 纵向比例
    if (ratio > 1) {
      switch (type) {
      case 'cover': return `margin-top: 50%; transform: translate(0, -50%);`;
      case 'contain': return `margin: auto; width: ${width}%; height: 100%;`;
      default: return false;
      }
    }

    // 横向比例
    if (ratio < 1) {
      switch (type) {
      case 'cover': return `margin-left: 50%; transform: translate(-50%, 0); width: inherit; height: 100%;`;
      case 'contain': return `margin: auto; width: 100%;`;
      default: return false;
      }
    }

    // 正方形
    return false;
  }),

  didInsertElement() {
    this._super(...arguments);

    const canvas = document.createElement('canvas');
    canvas.id = 'stack-blur-canvas';

    const adaptiveStyle = get(this, 'adaptiveStyle');

    const thumbnail = new Image();
    thumbnail.classList.add('thumbnail');
    thumbnail.src = get(this, 'thumbnail');
    if (adaptiveStyle) thumbnail.setAttribute('style', adaptiveStyle)
    thumbnail.onload = () => {
      thumbnail.classList.add('loaded');
      stackBlurImage(thumbnail, 'stack-blur-canvas', 5);
    }
    this.element.appendChild(thumbnail);
    this.element.appendChild(canvas);

    const image = new Image();
    image.classList.add('image');
    image.src = get(this, 'image');
    if (adaptiveStyle) image.setAttribute('style', adaptiveStyle)
    image.onload = () => {
      image.classList.add('loaded');
      later(this, 'teardownStackBlueEffect', canvas, thumbnail, 1000);
    };
    this.element.appendChild(image);
  },

  teardownStackBlueEffect(canvas, thumbnail) {
    this.element.removeChild(canvas);
    this.element.removeChild(thumbnail);
  }
});
