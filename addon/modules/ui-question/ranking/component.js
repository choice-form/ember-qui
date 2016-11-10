import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed, {alias} from 'ember-computed';
import Sortable from 'sortable';
import {later} from 'ember-runloop';

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
    //初始化
    const options = get(this, 'options');
    options.forEach((item,index)=>{
      if(item.sortNo > 0){
        this.element.getElementsByClassName('ranking-rank ')[index].setAttribute('class','ranking-rank component');
      }
    });

    //sortable事件
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
        const indexArray = this.handleEvents.handleOptionDrop(oldIndex, newIndex, get(this,'node'));

        indexArray.forEach((index)=>{
          const sortNo = parseInt(index) + 1;
          const thisNode = this.element.getElementsByClassName('ranking-rank ')[index];
          thisNode.getElementsByClassName('ranking-number')[0].innerHTML=sortNo;
          thisNode.setAttribute('class','ranking-rank component event');
          later(()=>{
            thisNode.setAttribute('class','ranking-rank component');
          },1000);
        });
      },
    });
  },

  didDestroyElement(){
    this.sortTable.destroy();
  },


}).reopenClass({ positionalParams: ['node', 'handleEvents']});
