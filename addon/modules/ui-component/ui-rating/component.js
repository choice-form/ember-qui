import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';

export default Component.extend({
  layout,
  classNames: ['ui-rating'],
  attributeBindings:['data-render-id'],
  'data-render-id': computed.oneWay('renderId'),

  classNameBindings: ['className'],
  className: "",

});
