import Component from '@ember/component';
import layout from './template';
import { addClass } from '../../lib/attribute-manage';

export default Component.extend({
  layout,
  tagName: 'div',
  classNames: ['warning'],

  didInsertElement(){
    addClass(document.getElementsByTagName('body')[0], 'noscroll');
  },

}).reopenClass({positionalParams: ['warning']});



/**
 * UiWarningComponent
 *
 ``` javascript
 {{#ui-addon/warning
     icon=model.warningType     //错误类型， 计划发布:planned, 收集结束:password, 错误页面: warning
     label=model.warningLabel   //错误文字信息
     level=model.level          //错误级别， 只有warningType = 'warning' 才有，level: "error"
     countDown=model.countDown  //计划发布倒计时,  只有warningType = 'planned' 才有， countDown: '24:00'
    {{ui-addon/footer}}
{{/ui-addon/warning}}
 ```
 *
 * @class UiWarningComponent(错误信息页 --*)
 */


/**
 * @property {String} warningType - 错误类型， 计划发布:planned, 收集结束:password, 错误页面: warning
 */

/**
 * @property {String} warningLabel - 错误文字信息
 */

/**
 * @property {String} level - 错误级别， 只有warningType = 'warning' 才有，level: "error"
 */


/**
 * @property {String} countDown - 计划发布倒计时,  只有warningType = 'planned' 才有， countDown: '24:00'
 */
