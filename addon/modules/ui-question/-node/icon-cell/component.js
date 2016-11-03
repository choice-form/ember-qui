import Component from 'ember-component';
import layout from './template';


export default Component.extend({
  layout,
  tagName:'',


}).reopenClass({ positionalParams: ['node', 'option']});

/**
 * **Thisis**
 *
 * @param {String} selectType - radio / checkbox , example: node.selectType
 * @param option {Object}  选项基本数据
 * @param handleOptionClick {Function} 点击事件
 * @private
 */
