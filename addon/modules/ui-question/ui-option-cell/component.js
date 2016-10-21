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

  classNames: ['ui-option-cell'],

  actions: {
    select() {
      //todo: 这里点击会出发2次。 原因是label和input通过for绑定了
      get(this, 'handleClick')(get(this, 'option'));
    },

    stopPropagation(event){
      event.stopPropagation();
    }
  },

  type: computed('nodeInfo.selectType', 'nodeInfo.type', function () {
    const selectType = get(this, 'nodeInfo.selectType');
    const type = get(this, 'nodeInfo.type');
    const uiService = get(this, 'uiService');
    return uiService.getOptionType(type, selectType);
  }),

  optionSvg: computed('option.', 'option.selected', 'option.icon', function () {
    const uiService = get(this, 'uiService');
    const inputType = get(this, 'option.inputType');
    const slected = get(this, 'option.selected');
    const icon = get(this, 'option.icon');
    return uiService.getOptionSvg(inputType, slected, icon);
  }),

  didInsertElement() {
    const input = this.element.querySelector('input');
    get(this, 'option.selected') && input.setAttribute('checked','checked');
  }
}).reopenClass({ positionalParams: ['option', 'nodeInfo']});
