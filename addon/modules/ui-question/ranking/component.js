import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed, {alias} from 'ember-computed';
import Sortable from 'sortable';

export default Component.extend({
  layout,

  classNameBindings: ['classname'],
  classNames:['ui-ranking'],

  attributeBindings:['data-render-id'],
  'data-render-id': computed.oneWay('node.renderId'),

  _options: alias('node.options'),

  actions: {

    test(index) {
      this.handleEvents.handleOptionDrop(index, 3, get(this, 'node'));
    },

    handleOptionClick(){
      this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'node'));
    },

    handleOptionInput(e){
      const value = e.target.value;
      set(this, 'option.value', value);
      this.handleEvents.handleOptionInput(get(this, 'option'),get(this,'node'));
    },
  },


  didInsertElement(){
    this.sortTable = new Sortable(this.element, {
      handle: '.ranking-rank',
      scroll: true,
      scrollSensitivity: 240,
      animation: 250,
      sort: true,
      filter: ".ui-text",
      ghostClass: "ghost",
      onEnd: (event)=> {
        const {oldIndex} = event;
        let {newIndex} = event;
        // 第一次拖动位于原位置,sortable不知道,手动设置为oldIndex初始位置
        if (newIndex === undefined) {
          newIndex = oldIndex;
        }
        /*this.recoverList = (list, newIndex, oldIndex)=>{
          if (newIndex == oldIndex) {
            return;
          }
          const {children} = list;
          const newItem = children[newIndex];
          const oldItem = oldIndex < newIndex
            ? children[oldIndex] : children[oldIndex + 1];
          list.insertBefore(newItem, oldItem);
        };
        this.recoverList(target, newIndex, oldIndex);*/

        this.handleEvents.handleOptionDrop(oldIndex, newIndex, get(this,'node'));

      },
    });
  },

  didDestroyElement(){
    this.sortTable.destroy();
  },

}).reopenClass({ positionalParams: ['node', 'handleEvents']});
