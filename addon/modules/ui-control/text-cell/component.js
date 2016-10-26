import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {isPresent} from 'ember-utils';
import {htmlSafe} from 'ember-string';


export default Component.extend({
  layout,
  tagName: '',
  /**
   * count(字数)，int(整数),phone(手机号),float(小数),email(邮件地址),calendar(日期),time(时间),postCode(邮编),url(网址),region(时间范围，日期范围)
   */
  svg: computed('option.inputRule', function () {
    const icon = `#${get(this, 'option.inputRule')}`;
    return htmlSafe(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
        <use xlink:href=${icon}></use>
      </svg>`);
  }),

  actions: {
    /**
     * change事件
     */
    handleOptionInput(){
      this.handleEvents.handleOptionInput(get(this, 'option'), get(this, 'control'));
    },
  },

}).reopenClass({positionalParams: ['control', 'option', 'handleEvents']});
