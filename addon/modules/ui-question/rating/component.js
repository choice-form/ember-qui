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

  graphs: computed('option.maxValue', 'option.value', 'option.icon', function () {
    const maxValue = parseInt(get(this, 'option.maxValue'));
    const value = parseInt(get(this, 'option.value'));
    const graph = get(this, 'option.icon');
    const randomId = new Date().getTime();
    let array = [];
    for(let i = 0; i < maxValue; i++){
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

    select(e){
      const value = e.target.value;
      const checked = e.target.checked;
      set(this, 'option.value', checked ? value : value -1);
    },
  },

}).reopenClass({ positionalParams: ['option']});
