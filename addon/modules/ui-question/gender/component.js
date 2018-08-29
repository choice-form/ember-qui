import Component from '@ember/component';
import layout from './template';
import { get } from '@ember/object';

export default Component.extend({
  layout,
  tagName:'',

  actions: {
    /**
     * click事件
     */
    handleOptionClick(option, e){
      !this.handleEvents.handleOptionClick(option ,get(this,'node'))
      &&  e.preventDefault();
    },


    /**
     * 其他选项事件
     */
    handleOptionInput(option, e){
      const value = e.currentTarget.value;
      this.handleEvents.handleOptionInput(value, option, get(this, 'node'));
    },

    handleOptionInputForTextarea(option, e){
      const value = e.currentTarget.value;
      this.handleEvents.handleOptionInput(value, option, get(this, 'node'));
      e.currentTarget.style.height = e.currentTarget.scrollHeight + 2 + 'px';
    },

  },

}).reopenClass({ positionalParams: ['node','handleEvents','options']});
