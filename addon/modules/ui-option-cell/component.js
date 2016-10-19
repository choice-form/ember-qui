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

  didInsertElement() {
    const input = this.element.querySelector('input');
    const label = this.element.querySelector('label');
    const picture = this.element.querySelector('img');
    label.setAttribute('for', input.id);
    this.element.classList.add('ui-option-cell');
  }
});
