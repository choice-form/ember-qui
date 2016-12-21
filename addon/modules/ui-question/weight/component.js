import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { htmlSafe } from 'ember-string';
import { reads } from 'ember-computed';

export default Component.extend({
  layout,
  classNames:['ui-weight'],
  attributeBindings:['data-render-id'],
  'data-render-id': reads('node.renderId'),

  didInsertElement(){
    const noUiScrolls = this.element.getElementsByClassName('noUi-target');
    get(this, 'node.options').forEach((item, index)=>{
      noUiScrolls[index].style.background = item.color;
      noUiScrolls[index].style['box-shadow'] = `0 0 0 1px ${item.color}`;
    });
  },

  actions: {
    updateDisplayValue(value) {
    },

    handleOptionUpdate(option, value){
      set(option, 'value', window.parseInt(value, 10));
    },

    handleOptionInput(option, value){
      this.handleEvents.handleOptionInput(
        window.parseInt(value, 10), option, get(this,'node')
      );
    }
  }
}).reopenClass({ positionalParams: ['node', 'handleEvents'] });
