import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import computed from 'ember-computed';
import {htmlSafe} from 'ember-string';
import inject from 'ember-service/inject';

export default Component.extend({
  layout,

}).reopenClass({positionalParams: ['node', 'option', 'handleEvents']});
