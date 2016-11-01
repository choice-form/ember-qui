import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import { htmlSafe } from 'ember-string';

export default Component.extend({
  layout,
  tagName: 'div',
  classNames: ['progressive-image'],

  paddingElement: computed('ratio', function() {
    const paddingTop = get(this, 'ratio') * 100;
    return htmlSafe(`<div style="padding-top: ${paddingTop}%;"></div>`);
  }),

  didInsertElement() {
    this._super(...arguments);

    const thumbnail = new Image();
    thumbnail.classList.add('thumbnail');
    thumbnail.src = get(this, 'thumbnail');
    thumbnail.onload = () => thumbnail.classList.add('loaded');
    this.element.appendChild(thumbnail);

    const image = new Image();
    image.classList.add('image');
    image.src = get(this, 'image');
    image.onload = () => image.classList.add('loaded');
    this.element.appendChild(image);
  }
});
