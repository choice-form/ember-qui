import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

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
    handleOptionInput(e){
      set(this, 'option.value',  e.target.value);
      this.handleEvents.handleOptionInput(get(this, 'option'),get(this,'control'));
    },
  },


}).reopenClass({ positionalParams: ['control','option','handleEvents']});
