import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';

export default Component.extend({
  layout,
  tagName:'',

  actions:{
    /**
     * onclick
     */
    handleOptionClick(e){
      const inputType = get(this, 'option.inputType');
      if (inputType === 'input')return;

      !this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'node'))
      &&  e.preventDefault();
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

  }

}).reopenClass({positionalParams: ['node','option', 'handleEvents']});
