import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed from 'ember-computed';
import Sortable from 'sortable';
/**
 * 排序题
 *
 * @class 问卷 - 排序
 */

export default Component.extend({
  layout,

  classNameBindings: ['classname'],
  classNames:['ui-ranking'],

  attributeBindings:['data-render-id'],
  'data-render-id': computed.oneWay('node.renderId'),

  actions: {
    /**
     * Click 事件
     *
     * @method handleOptionClick
     */
    handleOptionClick(){
      this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'node'));
    },

    /**
     * Change 事件
     *
     * @method handleOptionInput
     */
    handleOptionInput(e){
      const value = e.target.value;
      set(this, 'option.value', value);
      this.handleEvents.handleOptionInput(get(this, 'option'),get(this,'node'));
    },
  },

  didRender(){
    /**
     * Sortable 实例,用于排序`
     *
     * @type {Sortable}
     */
    this.sortTable = new Sortable(this.element, {
      handle: '.sort-list',
      scroll: true,
      scrollSensitivity: 240,
      animation: 250,
      sort: true,
      ghostClass: "ghost",
    });
  },

  didDestroyElement(){
    this.sortTable.destroy();
  }

  /**
   * 问卷节点,通过它获取 options
   *
   * @property {Object} node - 问卷节点
   * @required
   */

  /**
   * 模板使用属性
   *
   * @property {Object} option - 选项
   * @property {String} option.icon - 图标
   * @property {String} option.text - 文字
   */
}).reopenClass({ positionalParams: ['node', 'handleEvents']});
