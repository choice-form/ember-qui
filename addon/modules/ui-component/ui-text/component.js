import Component from 'ember-component';
import layout from './template';
import computed,{alias, reads} from 'ember-computed';
import get from 'ember-metal/get';
import mobiInit from '../../lib/mobile-factory'

export default Component.extend({
  layout,
  classNames: ['ui-text'],
  attributeBindings: ['data-render-id'],
  'data-render-id': reads('renderId'),

  /**
   * 'noValidation','count','int','float','moblie','email','date','dateRange','time','timeRange','postCode','url'
   */

  isTextArea: computed('inputRule', function () {
    const inputRule = get(this, 'inputRule');
    if (['noValidation', 'count'].indexOf(inputRule) > -1) {
      return true;
    } else {
      return false;
    }
  }),

  type: computed('inputRule', function () {
    const celType = ['int', 'moblie', 'postCode'];
    const numberType = ['float'];
    const urlType = ['url', 'email'];
    const inputRule = get(this, 'inputRule');
    if (celType.indexOf(inputRule) > -1) {
      return 'tel';
    }
    if (numberType.indexOf(inputRule) > -1) {
      return 'number';
    }
    if (urlType.indexOf(inputRule) > -1) {
      return 'url';
    }
    return 'text';
  }),



  size: '16px',

  viewBox: '16',

  icon: computed('inputRule', function () {
    const type = get(this, 'inputRule');
    if(['noValidation','count'].indexOf(type) > -1){
      return 'text';
    }
    if(['time','timeRange'].indexOf(type) > -1){
      return 'time';
    }
    if(['date','dateRange'].indexOf(type) > -1){
      return 'calendar';
    }

    return type;
  }),


  className: computed('inputRule', function () {
    const type = get(this, 'inputRule');
    if (['date', 'time', 'timeRange', 'dateRange'].indexOf(type) > -1) {
      return 'ui-menu';
    }
    return null;
  }),


  didRender(){
    const type = get(this, 'inputRule');
    const input = this.element.getElementsByTagName('input')[0];
    mobiInit(input, {
      type: type,
    });
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
 * @property {value} value - input的绑定的值,可变
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
