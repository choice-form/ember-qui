import Component from 'ember-component';
import computed from 'ember-computed';
import layout from './template';
import get from 'ember-metal/get';

export default Component.extend({
  layout,
  tagName: '',

}).reopenClass({positionalParams: ['node', 'option', 'handleEvents']});
