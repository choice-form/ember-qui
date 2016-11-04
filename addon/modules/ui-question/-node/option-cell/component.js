import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import inject from 'ember-service/inject';


export default Component.extend({
  layout,
  uiService: inject('service/icon'),
  tagName:'',

  actions: {
    handleOptionClick(){
      const inputType = get(this, 'option.inputType');
      if (inputType === 'input')return;
      this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'node'));
    },

  },

  didInsertElement() {
  }
}).reopenClass({positionalParams: ['node', 'option', 'handleEvents']});
