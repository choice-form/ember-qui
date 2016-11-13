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
                         uuid=option.uuid
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
 * @property {String} uuid - 选项的唯一ID
 */

/**
 * @property {String} name - 选项input的name属性  #example: node.uuid
 */


/**
 * @property {String} inputType - 是否有其他选项,input、selectedInput、select
 */

/**
 * @property {Bool} autofocus - input是否自动聚焦
 */

/**
 * @property {String} placeholder - placeholder文字
 */

/**
 * @property {Bool} selected - 选项选中状态, true、false
 */

/**
 * @property {Bool} disabled - input是否为disabled, 默认为false, 在多选题的情况下,如果选项到了上限,会将disabled设置为true
 */

/**
 * @property {String} value - input的值
 */

/**
 * @property {String} text - 选项文字
 */

/**
 * @property {String} icon - 选项的Icon
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
      const inputType = get(this, 'option.inputType');
      if (inputType === 'input')return;
      this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'node'));
    },
 ```
 */

/**
 * @method handleOptionInput
 *
 * @param {Object,String} value 当前input所得到的value
 * @param {Object} option 当前选择的选项
 * @param {Object} node 当前题型的数据对象
 *
 * @example
 ```javascript
 handleOptionInput(e){
      const value = e.currentTarget.value;
      this.handleEvents.handleOptionInput(value, get(this, 'option'), get(this, 'node'));
    },
 ```
 */

/**
 * @method handleOptionInputForTextarea
 *
 * @param {Object,String} value 当前input所得到的value
 * @param {Object} option 当前选择的选项
 * @param {Object} node 当前题型的数据对象
 *
 * @example
 ```javascript
 handleOptionInputForTextarea(e){
      const value = e.currentTarget.value;
      this.handleEvents.handleOptionInput(value, get(this, 'option'), get(this, 'node'));

      e.currentTarget.style.height = '74px';
      e.currentTarget.style.height = e.currentTarget.scrollHeight + 2 + 'px';

    },
 ```
 */
