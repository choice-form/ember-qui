import Component from 'ember-component';
import layout from './template';

export default Component.extend({
  layout,
  tagName:'',

});

/**
 * UiChoiceComponent
 *
 ``` javascript
 {{ui-component/ui-choice inputType=option.inputType
                         selectType=node.selectType
                         renderId=option.renderId
                         placeholder=option.placeholder
                         selected=option.selected
                         value=option.value
                         text=option.text
                         icon=option.icon
                         inputRule=option.inputRule
                         handleOptionClick=(action "handleOptionClick")
                         handleOptionInput=(action "handleOptionInput")
                         handleOptionInputForTextarea=(action "handleOptionInputForTextarea")
}}
 ```
 *
 * @class UiChoiceComponent
 */


/**
 * @property {String} selectType - input的类型, radio、checkbox
 */

/**
 * @property {String} renderId - 选项的唯一ID
 */

/**
 * @property {String} name - 选项input的name属性  #example: node.renderId
 */

/**
 * @property {Bool} selected - 选项选中状态, true、false
 */

/**
 * @property {Bool} disabled - input是否为disabled, 默认为false, 在多选题的情况下,如果选项到了上限,会将disabled设置为true
 */

/**
 * @property {String} icon - 选项Icon
 */

/**
 * @property {String} svg - icon题的svg元素, 是html结构
 */

/**
 * @property {String} text - 选项文字
 */


/**
 * @method handleOptionClick
 *
 * @param {Object} option 当前选择的选项
 * @param {Object} node 当前题型的数据对象
 *
 * @example
 ```javascript
 handleOptionClick(){
      this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'node'));
    },
 ```
 */
