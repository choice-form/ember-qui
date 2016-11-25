import Component from 'ember-component';
import layout from './template';


export default Component.extend({
  layout,
  tagName: 'label',
  classNames:['ui-label'],
  attributeBindings: ['for'],

  size: '16px',
  viewBox: '16',

}).reopenClass({positionalParams: ['option']});
