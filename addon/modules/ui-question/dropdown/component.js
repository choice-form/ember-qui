import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import computed from 'ember-computed';
import {htmlSafe} from 'ember-string';
import {mobiInitTreeList} from '../../lib/mobile-factory'

export default Component.extend({
  layout,
  tagName: '',


}).reopenClass({ positionalParams: ['node','handleEvents']});
