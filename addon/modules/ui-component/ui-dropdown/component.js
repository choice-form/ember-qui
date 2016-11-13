import Component from 'ember-component';
import layout from './template';

export default Component.extend({
  layout,
  classNames:['ui-dropdown ui-text dropdown'],

});

/**
 * UiDropdownComponent
 *
 ``` javascript
 {{ui-component/ui-dropdown options=node.options
                           quesType=node.quesType
                           icon='arrows-small-down'
}}
 ```
 * @class UiDropdownComponent
 *
 */


/**
 * @property {Array} options - 下拉列表
 */

/**
 * @property {String} quesType - 问卷类型名称
 */

/**
 * @property {String} titleIcon - 下拉列表的示意icon
 */

/**
 * @property {String} quesType - 问卷类型名称
 */

/**
 * @property {Bool} isMulitColmun - 是否有多列显示
 */

/**
 * @property {Bool} selected - 是否被选择
 */

/**
 * @property {String} text - list的内容文字
 */

