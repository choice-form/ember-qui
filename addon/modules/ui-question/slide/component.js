import Component from 'ember-component';
import layout from './template';
import computed, {alias} from 'ember-computed';

export default Component.extend({
  layout,
  tagName:'',


}).reopenClass({ positionalParams: ['node','handleEvents']});
