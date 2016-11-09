import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';

export default Component.extend({
  layout,
  tagName:'',

  actions:{
    handleOptionClick(){
      console.log('janiseshengTest');
      const inputType = get(this, 'option.inputType');
      if (inputType === 'input')return;
      this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'node'));
    },
  }

}).reopenClass({positionalParams: ['node','option', 'handleEvents']});
