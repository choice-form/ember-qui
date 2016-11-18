import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';


export default Component.extend({
  layout,
  tagName:'',

  graphs: computed('option.count', 'option.value', 'option.icon', 'option.emoji', function () {
    const count = parseInt(get(this, 'option.count'));
    const value = parseInt(get(this, 'option.value'));
    const emoji = get(this, 'option.emoji');
    const graph = get(this, 'option.icon');
    const randomId = new Date().getTime();

    let array = [];
    for(let i = 0; i < count; i++){
      array[i] = {
        renderId: randomId + i,
        value: i + 1,
      };

      if(i < value ){
        array[i].icon = graph + '-active';
        array[i].checked = true;
        emoji && emoji.length == 2 && (array[i].emoji = emoji[1]);
      }else{
        array[i].icon = graph;
        array[i].checked = false;
        emoji && emoji.length == 2 && (array[i].emoji = emoji[0]);
      }
    }
    return array;
  }),

  actions: {
    /**
     * click事件
     */
    handleOptionClick(e){

      !this.handleEvents.handleOptionInput(e.currentTarget.value, get(this, 'option'),get(this,'node'))
      && e.preventDefault();
    },

    /**
     * onInput
     */

    handleOptionInput(e){

      this.handleEvents.handleOptionInput(e, get(this, 'option'), get(this, 'node'));
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
