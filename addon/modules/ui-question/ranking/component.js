import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed from 'ember-computed';
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

  didRender(){
    this.sortTable = new Sortable(this.element, {
      handle: '.sort-list',
      scroll: true,
      scrollSensitivity: 240,
      animation: 250,
      sort: true,
      ghostClass: "ghost",
    });
  },

  didDestroyElement(){
    this.sortTable.destroy();
  }

}).reopenClass({ positionalParams: ['node', 'handleEvents']});
