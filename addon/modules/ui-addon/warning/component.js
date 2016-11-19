import Component from 'ember-component';
import layout from './template';
import {addClass} from '../../lib/attribute-manage';

export default Component.extend({
  layout,
  tagName: 'div',
  classNames: ['warning'],

  didInsertElement(){
    addClass(document.getElementsByTagName('body')[0], 'noscroll');
  },

}).reopenClass({positionalParams: ['warning']});
