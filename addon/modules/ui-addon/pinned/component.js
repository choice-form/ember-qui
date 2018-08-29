import { computed } from '@ember/object';
import { get } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop';
import $ from 'jquery';
import Component from '@ember/component';

import layout from './template';

export default Component.extend({
  classNames: ['pinned-content'],
  attributeBindings: ['style', 'data-state'],
  top: null,
  bottom: null,
  windoc: service(),
  layout,
  _unfixedWidth: null,
  pinSupport: null,
  didInsertElement() {
    this._super(...arguments);
    this._saveUnfixedWidth();
    this.pinSupport = this.element.parentNode.querySelector('.pin-support');
    run.scheduleOnce('afterRender', () => {
      this.set('_initialOffsetTop', this.$().offset().top);
      this.set('_initialOffsetLeft', this.$().offset().left);
    });
  },

  _saveUnfixedWidth() {
    if (this.$() && !(this.get('_fixedToTop') || this.get('_fixedToBottom'))) {
      this.set('_unfixedWidth', this.$().width());
    }
  },

  _fixedToTop: computed('_initialOffsetTop', 'windoc.scrollTop', 'top', function () {
    if (this.get('top') === null) {
      run.debounce(this, '_saveUnfixedWidth', 10);
      return false;
    } else {
      return (this.get('windoc.scrollTop') + this.get('top')) > this.get('_initialOffsetTop');
    }
  }),

  _fixedToBottom: computed('_initialOffsetTop', 'windoc.{clientHeight,scrollBottom}', 'bottom', function () {
    if (this.get('bottom') === null) {
      run.debounce(this, '_saveUnfixedWidth', 10);
      return false;
    } else {
      // let x = (this.get('windoc.scrollHeight') - this.get('_initialOffsetTop'));
      let y = (this.get('windoc.scrollBottom') + this.get('bottom'));
      return y > this.get('bottom');
    }
  }),

  pinSupportRect() {
    if (this.pinSupport &&
      $('html').hasClass('desktop')) {
      return this.pinSupport.getBoundingClientRect();
    }
  },

  ['data-state']: computed('scale', function () {
    return get(this, 'scale') ? 'scale' : '';
  }),

  controlPinSupport(){
    if(this.get('_fixedToTop')){
      $(this.pinSupport).show();
    }else{
      $(this.pinSupport).hide();
    }
  },

  style: computed('_initialOffsetTop', '_initialOffsetLeft', 'top', 'bottom', '_fixedToTop', '_fixedToBottom', function () {
    if (this.element) {
      let cssAttrs = [];
      this.controlPinSupport();
      if (this.get('_fixedToTop')) {
        let rect = this.pinSupportRect();
        let left = rect ? `${rect.left}px` : `${this.get('_initialOffsetLeft')}px`;
        let width = rect ? `${rect.width}px` : `${this.get('_unfixedWidth')}px`;
        cssAttrs.push(['position', 'fixed']);
        cssAttrs.push(['top', `${this.get('top')}px`]);
        cssAttrs.push(['left', left]);
        if(left === '0px'){
          debugger; // eslint-disable-line
        }
        if (this.get('_unfixedWidth')) {
          cssAttrs.push(['width', width]);
        }
      } else if (this.get('_fixedToBottom')) {
        cssAttrs.push(['position', 'fixed']);
        cssAttrs.push(['bottom', `${this.get('bottom')}px`]);
        cssAttrs.push(['left', `${this.get('_initialOffsetLeft')}px`]);
        if(`${this.get('_initialOffsetLeft')}px` === '0px'){
          debugger; // eslint-disable-line
        }
        if (this.get('_unfixedWidth')) {
          cssAttrs.push(['width', `${this.get('_unfixedWidth')}px`]);
        }
      }
      return htmlSafe(cssAttrs.map((attr) => {
        return `${attr[0]}: ${attr[1]}`;
      }).join('; '));
    } else {
      return htmlSafe('');
    }
  })
});
