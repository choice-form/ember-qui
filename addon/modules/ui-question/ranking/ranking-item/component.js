import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed from 'ember-computed';
import {later} from 'ember-runloop';

export default Component.extend({
  layout,
  classNameBindings: ['classname'],
  classname:computed('sortNo', 'class_event', function () {
    const isSortNo = get(this, 'sortNo');
    const classEvent = get(this, 'class_event');
    if(isSortNo){
      return `ranking-rank ${classEvent}`
    }else{
      return 'ranking-rank'
      }
  }),


  didUpdateAttrs() {
    this._super(...arguments);
    set(this, 'class_event', 'complete event')
    later(()=>{
      set(this, 'class_event', 'complete')
    }, 1000);
  },


  attributeBindings:['data-render-id'],
  'data-render-id': computed.oneWay('node.renderId'),

}).reopenClass({ positionalParams: ['option']});
