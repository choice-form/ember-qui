import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';


export default Component.extend({
  layout,
  tagName:'',

}).reopenClass({ positionalParams: ['node','option','handleEvents']});
