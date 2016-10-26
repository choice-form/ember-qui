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

  graphs: computed('option.count', 'option.value', 'option.icon', function () {
    const count = parseInt(get(this, 'option.count'));
    const value = parseInt(get(this, 'option.value'));
    const graph = get(this, 'option.icon');
    const randomId = new Date().getTime();
    let array = [];
    for(let i = 0; i < count; i++){
      array[i] = {
        uuid: randomId + i,
        value: i + 1,
      };

      if(i < value ){
        array[i].icon = graph + '-fill';
        array[i].checked = true;
      }else{
        array[i].icon = graph;
        array[i].checked = false;
      }
    }

    return array;
  }),

  actions: {
    /**
     * click事件
     */
    handleOptionClick(e){
      const value = e.target.value;
      const checked = e.target.checked;
      set(this, 'option.value', checked ? value : value -1);
      this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'control'));
    },

    /**
     * change事件
     */
    handleOptionInput(e){

      this.handleEvents.handleOptionInput(get(this, 'option'),get(this,'control'));
    },
  },

}).reopenClass({ positionalParams: ['control','option','handleEvents']});