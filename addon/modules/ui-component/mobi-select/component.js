import Component from 'ember-component';
import layout from './template';
import { scheduleOnce } from 'ember-runloop';
import get from 'ember-metal/get';
import { initSelect } from '../../lib/mobile-factory';



export default Component.extend({
  layout,
  tagName:'select',
  attributeBindings: ['style','multiple'],
  style: 'display:none',
  multiple: true,

  selectInit(){
    initSelect(this.element, {
      onSet: (event, inst)=> {
        get(this, 'handleSelect') && get(this, 'handleSelect')(event.valueText, get(this, 'node'));
      }
    })
  },

  didInsertElement(){
    scheduleOnce('afterRender',this,'selectInit');
  },

});
