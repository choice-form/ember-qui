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
  uiService: inject('ui'),

  classNames: ['cell'],

  actions: {
    select() {
      //todo: 这里点击会出发2次。 原因是label和input通过for绑定了
      get(this, 'handleClick')(get(this, 'option'));
    },

    change(e){
      const value = e.target.value;
      console.log(value);
      set(this, 'option.value', value);
    },

    stopPropagation(event){
      event.stopPropagation();
    }
  },


  optionSvg: computed('option.selected', 'option.icon', function () {
    const uiService = get(this, 'uiService');
    const slected = get(this, 'option.selected');
    const icon = get(this, 'option.icon');
    return uiService.getOptionSvg(slected, icon);
  }),



  didInsertElement() {
    const input = this.element.querySelector('input');
    get(this, 'option.selected') && input.setAttribute('checked','checked');
    const nodeType = get(this, 'nodeInfo.type');
  }
}).reopenClass({ positionalParams: ['option', 'nodeInfo']});
