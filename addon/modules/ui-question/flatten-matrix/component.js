import Component from 'ember-component';
import layout from './template';
import set, {setProperties} from 'ember-metal/set';
import {scheduleOnce} from 'ember-runloop';
import {gt, and, reads} from 'ember-computed';

export default Component.extend({
  layout,
  classNames: ['ui-flatten-matrix'],

  attributeBindings: ['data-render-id'],
  'data-render-id': reads('node.renderId'),

  clientWidth: window.innerWidth,

  init(){
    this._super(...arguments);
    device.desktop() && window.addEventListener('resize', () => {
      set(this, 'clientWidth', window.innerWidth);
    });
  }


}).reopenClass({positionalParams: ['node', 'handleEvents']});
