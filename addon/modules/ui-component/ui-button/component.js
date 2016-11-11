import Component from 'ember-component';
import layout from './template';

export default Component.extend({
  layout,
  tagName: 'button',
  classNames: ['ui-button', 'button'],
  classNameBindings: ['className'],
  className: "",

  size: '16px',
  viewBox: '16',

  click(){
    this.handleClick && this.handleClick();
  }
});

/**
 * ui-button
 *
 * @class ui-button
 */


/**
 * @property {String} leftIcon - 给button添加一个左边的icon
 */

/**
 * @property {String} rightIcon - 给button添加一个右边的icon
 */

/**
 * @property {String} size - 设置icon的size 默认为16px
 */

/**
 * @property {String} viewBox - 设置icon的viewBox 默认为16
 */

/**
 * @property {String} iconClass - 给icon的svg添加一个class名称
 */

/**
 * @property {String} text - button的内容文字
 */

/**
 * button的click事件
 *
 * @method handleClick
 */
