import Component from 'ember-component';
import layout from './template';


export default Component.extend({

  layout,
  classNames: ['ui-verification'],
  attributeBindings: ['renderId'],

  size: '64px',
  viewBox: '40',

})
