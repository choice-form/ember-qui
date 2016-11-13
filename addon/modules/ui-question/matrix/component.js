import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';

export default Component.extend({
  layout,
  tagName:"",

  actions: {
    handleOptionClick(option){
      this.handleEvents.handleOptionClick(option, get(this, 'node'));
    },


    /**
     * onInput
     */

    handleOptionInput(e){
      const value = e.currentTarget.value;
      this.handleEvents.handleOptionInput(value, get(this, 'option'), get(this, 'node'));
    },


    /**
     * handleOptionInputForTextarea
     */

    handleOptionInputForTextarea(e){
      const value = e.currentTarget.value;
      this.handleEvents.handleOptionInput(value, get(this, 'option'), get(this, 'node'));

      e.currentTarget.style.height = '74px';
      e.currentTarget.style.height = e.currentTarget.scrollHeight + 2 + 'px';

    },

  },

}).reopenClass({positionalParams: ['node', 'handleEvents']});
