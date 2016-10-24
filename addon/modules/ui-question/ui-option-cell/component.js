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

  actions: {
    /**
     * 选中事件，如果其他选项是'input'类型？则，直接return
     */
    select(){
      const inputType = get(this, 'option.inputType');
      if (inputType === 'input')return;
      this.handleClick(get(this, 'option'));
    },

    /**
     * change事件
     */
    change(e){
      console.log('点了Change');
    },
  },

  /**
   * 其他选项input Type类型
   */
  type: computed('option.inputType', function () {
    const inputType = get(this, 'option.inputType');
    if(!inputType){
      return get(this, 'nodeInfo.selectType');
    }

    if (inputType === 'input') {
      return 'text';
    } else {
      return 'radio';
    }
  }),

  /**
   * 设置选项的svg icon
   */
  optionSvg: computed('option.selected', 'option.icon', function () {
    const uiService = get(this, 'uiService');
    const selected = get(this, 'option.selected');
    const icon = get(this, 'option.icon');
    return uiService.getOptionSvg(selected, icon);
  }),

  didInsertElement() {
  }
}).reopenClass({positionalParams: ['option', 'nodeInfo']});
