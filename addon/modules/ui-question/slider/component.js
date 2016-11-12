import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';

export default Component.extend({
  layout,
  tagName:'',

  actions: {

    /**
     * change / onInput事件
     */
    handleOptionInput(e){
      const option = get(this, 'option');
      let data = '';
      if(option.inputRule){
        data =  e.currentTarget.value;
      }else{
        data =  parseInt(e);
      }
      this.handleEvents.handleOptionInput(data, get(this, 'option'),get(this,'node'));
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

}).reopenClass({ positionalParams: ['node','option','handleEvents']});
