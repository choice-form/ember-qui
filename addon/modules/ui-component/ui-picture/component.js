import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import computed, { reads } from 'ember-computed';

export default Component.extend({
  layout,
  classNames: ['ui-picture'],
  attributeBindings: ['data-render-id'],
  'data-render-id': reads('renderId'),

  size: computed('picStyle', function () {
    if (get(this, 'picStyle') === 'superscript') {
      return 'm'
    }
    return 's'
  }),
})
