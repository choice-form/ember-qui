import { get } from '@ember/object';
import $ from 'jquery';
import Component from '@ember/component';
import { device } from 'device';

import layout from './template';

export default Component.extend({
  layout,
  pinned: null,
  pinSupport: null,
  resizeTaskId: -10000,
  init() {
    this._super(...arguments);
    this.resizePinSupport = this.resizePinSupport.bind(this);
  },
  didInsertElement() {
    this._super(...arguments);
    if (get(this, 'needPin')) {
      setTimeout(() => {
        this.resizePinSupport();
      }, 500);
      if (device.desktop) {
        window.addEventListener('resize', this.resizePinSupport);
      }
    }
  },

  resizePinSupport() {
    clearTimeout(this.resizeTaskId);
    this.resizeTaskId = setTimeout(() => {
      if (!this.pinned) {
        this.pinned = this.element.querySelector('.pinned-content');
        this.pinSupport = this.element.querySelector('.pin-support');
      }
      this.pinSupport.style.height = $(this.pinned).height() + 'px';
    }, 250);
  },

  willDestroyElement() {
    window.removeEventListener('resize', this.resizePinSupport);
  },
});
