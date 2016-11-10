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

  paddingElement: computed('ratio', function() {
    const paddingTop = get(this, 'ratio') * 100;
    return htmlSafe(`<div style="padding-top: ${paddingTop}%;"></div>`);
  }),

  objectFit: '0 0',

  didInsertElement() {
    this._super(...arguments);

    const canvas = document.createElement('canvas');
    canvas.id = 'stack-blur-canvas';

    const thumbnail = new Image();
    thumbnail.classList.add('thumbnail');
    thumbnail.src = get(this, 'thumbnail');
    thumbnail.style.margin = get(this, 'objectFit');
    thumbnail.onload = () => {
      thumbnail.classList.add('loaded');
      stackBlurImage(thumbnail, 'stack-blur-canvas', 5);
    }
    this.element.appendChild(thumbnail);
    this.element.appendChild(canvas);

    const image = new Image();
    image.classList.add('image');
    image.src = get(this, 'image');
    image.style.margin = get(this, 'objectFit');
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
