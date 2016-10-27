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
    },

    /**
     * change事件
     */
    handleOptionInput(e){
      const value = e.currentTarget.value;
      this.handleEvents.handleOptionInput(value, get(this,'control'));
    },

  },

}).reopenClass({ positionalParams: ['control','handleEvents']});
