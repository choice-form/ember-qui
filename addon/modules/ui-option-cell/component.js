import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import { isPresent } from 'ember-utils';
import { htmlSafe } from 'ember-string';

export default Component.extend({
  layout,

  checkedClass: computed('checked', function() {
    return get(this, 'checked') ? 'checked' : 'unchecked';
  }),

  errorMessage: computed('subject.error', 'error', function() {
    const error = get(this, 'subject.error') || get(this, 'error');
    if (isPresent(error)) {
      return htmlSafe(`<div class="error-message>${error}</div>`);
    } else return '';
  }),

  img: null,
  picture: computed('img', function() {
    const img = get(this, 'img');
    return img ? htmlSafe(`<img src="${img}">`) : null;
  }),

  //selected 接口 根据返回值判断使用什么形式的svg
  selectDefaultIcon: `<svg viewBox="0 0 32 32">
  <path d="M25.227 30.667c-0.107 0-0.213 0-0.267-0.053l-8.96-5.387-8.96 5.387c-0.16 0.107-0.427 0.107-0.587 0s-0.267-0.32-0.213-0.533l2.4-10.133-7.947-6.88c-0.16-0.16-0.213-0.373-0.16-0.587s0.267-0.373 0.48-0.373l10.4-0.907 4.053-9.547c0.107-0.213 0.267-0.32 0.48-0.32s0.427 0.107 0.48 0.32l4.16 9.547 10.4 0.907c0.213 0 0.373 0.16 0.48 0.373 0.053 0.213 0 0.427-0.16 0.587l-7.947 6.827 2.347 10.027c0.053 0.053 0.053 0.16 0.053 0.213 0 0.32-0.213 0.533-0.533 0.533 0 0 0 0 0 0zM16 24.053c0.107 0 0.213 0 0.267 0.053l8.16 4.907-2.187-9.227c-0.053-0.213 0-0.373 0.16-0.533l7.2-6.187-9.44-0.8c-0.213 0-0.373-0.16-0.427-0.32l-3.733-8.693-3.68 8.693c-0.053 0.16-0.267 0.32-0.427 0.32l-9.493 0.8 7.2 6.187c0.16 0.107 0.213 0.32 0.16 0.533l-2.187 9.227 8.16-4.907c0.053-0.053 0.16-0.053 0.267-0.053z"/>
  </svg>`,

  selectedIcon: `<svg viewBox="0 0 32 32">
  <path d="M25.227 30.667c-0.107 0-0.213 0-0.267-0.053l-8.96-5.387-8.96 5.387c-0.16 0.107-0.427 0.107-0.587 0s-0.267-0.32-0.213-0.533l2.4-10.133-7.947-6.88c-0.16-0.16-0.213-0.373-0.16-0.587s0.267-0.373 0.48-0.373l10.4-0.907 4.053-9.547c0.107-0.213 0.267-0.32 0.48-0.32s0.427 0.107 0.48 0.32l4.16 9.547 10.4 0.907c0.213 0 0.373 0.16 0.48 0.373 0.053 0.213 0 0.427-0.16 0.587l-7.947 6.827 2.347 10.027c0.053 0.053 0.053 0.16 0.053 0.213 0 0.32-0.267 0.533-0.533 0.533 0 0 0 0 0 0z"/>
  </svg>`,

  selected: false,
  svg: computed('selected', function () {
    const isSelected = get(this, 'selected');
    return isSelected ? get(this, 'selectedIcon') : get(this, 'selectDefaultIcon');
  }),

  //留出点击选中handclick接口
  actions: {
    handClick: function() {
      const input = this.element.querySelector('input');
      console.log( input);
    }
  },

  didInsertElement() {
    const input = this.element.querySelector('input');
    const label = this.element.querySelector('label');
    const picture = this.element.querySelector('img');
    label.setAttribute('for', input.id);
    this.element.classList.add('ui-option-cell');
  }
});
