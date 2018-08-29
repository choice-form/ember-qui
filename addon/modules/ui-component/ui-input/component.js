import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,

  classNames:['ui-text'],

  size: '16px',
  viewBox: '16',

});

/**
 * UiInputComponent
 *
 ``` javascript
 {{ui-component/ui-input type='url' value='' handleOptionInput=handleOptionInput
                        placeholder=(if (eq verificationType "captcha") 'Please enter a password' 'Please enter verification code')
                        icon='int'
}}
 ```
 *
 * @class UiInputComponent
 */


/**
 * @property {String} className - input的class名称
 */

/**
 * @property {String} type - input类型,radio、checkbox
 */

/**
 * @property {String} placeholder - placeholder文字
 */

/**
 * @property {String} value - input的值
 */

/**
 * @property {String} icon - 选项的Icon
 */

/**
 * @property {String} size - icon的尺寸. #example: width=size, height=size
 */

/**
 * @property {String} viewbox - icon的viewbox属性
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
