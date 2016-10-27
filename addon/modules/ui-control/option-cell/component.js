import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import inject from 'ember-service/inject';


export default Component.extend({
  layout,
  uiService: inject('service/icon'),
  tagName:'',

  actions: {
    /**
     * 选中事件，如果其他选项是'input'类型？则，直接return
     */
    handleOptionClick(){
      const inputType = get(this, 'option.inputType');
      if (inputType === 'input')return;
      this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'control'));
    },

    /**
     * change事件
     */
    handleOptionInput(){
      this.handleEvents.handleOptionInput(get(this, 'option'),get(this,'control'));
    },

  },

  didInsertElement() {
  }
}).reopenClass({positionalParams: ['control', 'option', 'handleEvents']});
