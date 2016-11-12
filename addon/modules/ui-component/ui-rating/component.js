import Component from 'ember-component';
import layout from './template';
import {reads} from 'ember-computed';

export default Component.extend({
  layout,
  classNames: ['ui-rating'],
  attributeBindings:['data-render-id'],
  'data-render-id': reads('renderId'),

  classNameBindings: ['className'],
  className: "",

});
