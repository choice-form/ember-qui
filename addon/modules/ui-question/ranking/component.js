import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {isPresent} from 'ember-utils';
import {htmlSafe} from 'ember-string';
import inject from 'ember-service/inject';


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
      const value = e.target.value;
      console.log(value);
      set(this, 'option.value', value);
      this.handleEvents.handleOptionInput(get(this, 'option'),get(this,'control'));
    },
  },

}).reopenClass({ positionalParams: ['control','option','handleEvents']});
