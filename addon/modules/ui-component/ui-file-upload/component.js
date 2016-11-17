import Component from 'ember-component';
import layout from './template';
import {reads} from 'ember-computed';

export default Component.extend({
  layout,

  attributeBindings: ['data-render-id'],
  'data-render-id': reads('renderId'),

  classNames:['ui-file-upload'],

});

/**
 * UiFileUploadComponent
 *
 ``` javascript
 {{ui-component/ui-file-upload state=state
                               button=button
                               icon=icon
                               uploadText=uploadText
                               renderId=option.renderId
                               value=option.value
                               text=option.text
                               handleOptionInput=(action "handleOptionInput")
                               handleOptionClick=(action "handleOptionClick")
 }}
 ```
 *
 * @class UiFileUploadComponent
 *
 */


/**
 * @property {String} state - class名称, 根据上传状态修改class名称
 */

/**
 * @property {String} icon - svg名称, 根据上传状态修改icon名称
 */

/**
 * @property {String} button - class名称, 根据上传状态修改class名称
 */

/**
 * @property {String} uploadText - 文字描述,根据上传状态修改文字描述
 */

/**
 * @property {String} renderId - 选项的uuid
 */

/**
 * @property {String} value - 选项的value
 */

/**
 * @property {String} text - 选项的文字
 */

/**
 * 监听选项输入方法
 *
 * @method handleOptionInput
 */

/**
 * 监听选项点击方法
 *
 * @method handleOptionClick
 */
