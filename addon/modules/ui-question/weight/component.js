import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import {reads} from 'ember-computed';

export default Component.extend({
  layout,

  attributeBindings:['data-render-id'],
  'data-render-id': reads('node.renderId'),

  actions: {

    /**
     * change事件
     */
    handleOptionInput(option, e){
      this.handleEvents.handleOptionInput( parseInt(e), option, get(this,'node'));
    },
  },

  didInsertElement(){
    const noUiScrolls = this.element.getElementsByClassName('noUi-target');
    const options = get(this, 'node.options');
    options.forEach((item,index)=>{
      noUiScrolls[index].style.background = item.color;
      noUiScrolls[index].style['box-shadow'] = `0 0 0 1px ${item.color}`;
    });
  },

}).reopenClass({ positionalParams: ['node','handleEvents']});
