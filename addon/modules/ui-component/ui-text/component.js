import Component from 'ember-component';
import layout from './template';
import computed, {reads} from 'ember-computed';
import get from 'ember-metal/get';
import {htmlSafe} from 'ember-string';
import mobiInit from '../../lib/mobile-factory'

export default Component.extend({
  layout,
  classNames: ['ui-text'],
  attributeBindings: ['data-render-id', 'style'],

  'data-render-id': reads('renderId'),

  display: 'block',
  style: computed('display', function () {
    return htmlSafe(`display: ${get(this, 'display')}`);
  }).readOnly(),

  isTextArea: computed('inputRule', function () {
    return ['noValidation', 'count'].indexOf(get(this, 'inputRule')) > -1;
  }).readOnly(),

  type: computed('inputRule', function () {
    const inputRule = get(this, 'inputRule');

    if (['moblie'].indexOf(inputRule) > -1) return 'tel';
    if (['link', 'email'].indexOf(inputRule) > -1) return 'url';
    return 'text';
  }).readOnly(),

  icon: computed('inputRule', function () {
    const type = get(this, 'inputRule');

    if (['time', 'timeRange'].indexOf(type) > -1) return 'time';
    if (['noValidation', 'count'].indexOf(type) > -1) return 'text';
    if (['date', 'dateRange'].indexOf(type) > -1) return 'calendar';
    if (['email', 'postCode'].indexOf(type) > -1) return 'email';
    return type;
  }).readOnly(),

  className: computed('inputRule', function () {
    return ['date', 'time', 'timeRange', 'dateRange']
      .indexOf(get(this, 'inputRule')) > -1 ? 'ui-menu' : null;
  }).readOnly(),

  didInsertElement(){
    const input = this.element.getElementsByTagName('input')[0];
    const _grade = get(this, 'grade');
    const _timeGrade = get(this, 'timeGrade');
    const min = get(this, 'min');
    const max = get(this, 'max');
    mobiInit(input, {type: get(this, 'inputRule'), max, min, _grade, _timeGrade});
  }
});

/**
 * ui-text
 *
 * @class ui-text
 */


/**
 * @property {String} inputRule - input类型
 */

/**
 * @property {String} placeholder - input的placeholder
 */

/**
 * @property {String} value - input的绑定的值,可变
 */

/**
 * @property {String} errorMessage - input验证错误信息
 */


/**
 * @property {String} icon - 选项svg图标,可以不传
 */

/**
 * @property {String} size - svg尺寸,例如:16px
 */

/**
 * @property {String} viewbox - viewbox大小
 */

/**
 * textarea的input事件
 *
 * @method handleOptionInputForTextarea
 */


/**
 * input的input事件
 *
 * @method handleOptionInput
 */
