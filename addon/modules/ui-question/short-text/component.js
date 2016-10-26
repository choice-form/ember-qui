import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';


export default Component.extend({
  layout,
  tagName:'',

  actions: {
    /**
     * click事件
     */
    handleOptionClick(){
      this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'control'));
    },

    /**
     * change事件
     */
    handleOptionInput(){
      this.handleEvents.handleOptionInput(get(this, 'option'),get(this,'control'));
    },
  },
}).reopenClass({ positionalParams: ['control', 'option', 'handleEvents']});
