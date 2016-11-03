import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed from 'ember-computed';
import sortable from 'sortable';

export default Component.extend({
  layout,

  classNameBindings: ['classname'],
  classNames:['ui-ranking'],

  attributeBindings:['data-render-id'],
  'data-render-id': computed.oneWay('node.renderId'),

  actions: {
    /**
     * click事件
     */
    handleOptionClick(){
      this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'node'));
    },

    /**
     * change事件
     */
    handleOptionInput(e){
      const value = e.target.value;
      set(this, 'option.value', value);
      this.handleEvents.handleOptionInput(get(this, 'option'),get(this,'node'));
    },
  },

  didRender(){
    this.sortTable = new sortable(this.element, {
      handle: '.sort-list',
      scroll: true,
      scrollSensitivity: 240,
      animation: 250,
      sort: true,
      onEnd: (event)=> {

      },
      onStart: (event)=> {

      }
    });
  }

}).reopenClass({ positionalParams: ['node', 'handleEvents']});
