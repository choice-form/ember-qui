import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';

export default Component.extend({
  layout,
  tagName:'',

  /**
   * click事件
   */
  handleOptionClick(){
    this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'node'));
  },


}).reopenClass({ positionalParams: ['node', 'option']});
