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

  actions: {
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
        if (newIndex === undefined) {
          newIndex = oldIndex;
        }

        const sotNo = this.handleEvents.handleOptionDrop(oldIndex, newIndex, get(this,'node'));
        console.log(sotNo);
      },
    });
  },

  didDestroyElement(){
    this.sortTable.destroy();
  },

}).reopenClass({ positionalParams: ['node', 'handleEvents']});
