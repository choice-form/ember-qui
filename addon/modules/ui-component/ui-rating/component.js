import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';


export default Component.extend({
  layout,
  classNames: ['ui-rating'],
  attributeBindings:['data-render-id'],
  'data-render-id': computed.oneWay('node.renderId'),
  classNameBindings: ['className'],
  className: "",


  graphs: computed('option.count', 'option.value', 'option.icon', 'option.emoji', function () {
    const count = parseInt(get(this, 'option.count'));
    const value = parseInt(get(this, 'option.value'));
    const emoji = get(this, 'option.emoji');
    const graph = get(this, 'option.icon');
    const randomId = new Date().getTime();

    let array = [];
    for(let i = 0; i < count; i++){
      array[i] = {
        uuid: randomId + i,
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
     * handleOptionInput事件
     */
    handleOptionInput(e){
      const value = e.target.value;
      const checked = e.target.checked;
      const data = checked ? value : value -1;
      this.handleEvents.handleOptionInput(data, get(this, 'option'),get(this,'node'));
    },
  },

}).reopenClass({ positionalParams: ['node','option','handleEvents']});
