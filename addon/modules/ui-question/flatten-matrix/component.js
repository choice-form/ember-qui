import Component from 'ember-component';
import layout from './template';
import {setProperties} from 'ember-metal/set';
import {scheduleOnce} from 'ember-runloop';
import {gt, and, reads} from 'ember-computed';

export default Component.extend({
  layout,
  classNames: [''],

  attributeBindings: ['data-render-id'],
  'data-render-id': reads('node.renderId'),


}).reopenClass({positionalParams: ['node', 'handleEvents']});
