import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import computed from 'ember-computed';
import mobiscroll from 'mobiscroll'

export default Component.extend({
  layout,
  classNames:['ui-dropdown'],
  attributeBindings:['data-render-id'],
  'data-render-id': computed.oneWay('control.renderId'),

  actions: {
    /**
     * click事件
     */
    handleOptionClick(){
    },

    /**
     * change事件
     */
    handleOptionInput(e){
      const value = e.currentTarget.value;
      this.handleEvents.handleOptionInput(value, get(this,'control'));
    },

  },

  didRender(){
    const input = this.element.getElementsByClassName('dropdown-list')[0];
    mobiscroll.treelist(input, {
      theme: 'mobiscroll',
      display: 'bottom',
      labels: ['Ingredients'],
      placeholder: 'Please Select ...',
      width: 200
    });
  }
}).reopenClass({ positionalParams: ['control','handleEvents']});
