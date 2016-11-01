import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed from 'ember-computed';
import {htmlSafe} from 'ember-string';

export default Component.extend({
  layout,
  classNames:['ui-verification'],
  attributeBindings:['data-render-id'],
  'data-render-id': computed.oneWay('node.renderId'),

}).reopenClass({ positionalParams: ['node','handleEvents']});
