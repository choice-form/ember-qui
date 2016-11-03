import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import mobiInit from '../../../lib/mobile-factory'

export default Component.extend({
  layout,
  classNames: ['ui-text'],
  attributeBindings: ['data-render-id'],
  'data-render-id': computed.oneWay('node.renderId'),

  /**
   * 'noValidation','','int','phone','float','email','date','dateRange','time','timeRange','postCode','url'
   */

  isTextArea: computed('option.inputRule', function () {
    const inputRule = get(this, 'option.inputRule');
    if (['noValidation', 'count'].indexOf(inputRule) > -1) {
      return true;
    } else {
      return false;
    }
  }),

  type: computed('option.inputRule', function () {
    const celType = ['int', 'phone', 'postCode'];
    const numberType = ['float'];
    const urlType = ['url', 'email'];
    const inputRule = get(this, 'option.inputRule');
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

  svgName: computed('option.inputRule', function () {
    return get(this, 'option.inputRule');
  }),


  actions: {
    /**
     * onInput
     */

    handleOptionInput(e){
      const value = e.currentTarget.value;
      this.handleEvents.handleOptionInput(value, get(this, 'option'), get(this, 'node'));
    },


    /**
     * handleOptionInputForTextarea
     */

    handleOptionInputForTextarea(e){
      const value = e.currentTarget.value;
      this.handleEvents.handleOptionInput(value, get(this, 'option'), get(this, 'node'));

      const inputRule = get(this, 'option.inputRule');
      e.currentTarget.style.height = '74px';
      e.currentTarget.style.height = e.currentTarget.scrollHeight + 2 + 'px';

    },
  },

  mobiClassName: computed('option.inputRule', function () {
    const type = get(this, 'option.inputRule');
    if (['date', 'time', 'timeRange', 'dateRange'].indexOf(type) > -1) {
      return 'ui-menu';
    }
    return null;
  }),

  didRender(){
    const type = get(this, 'option.inputRule');
    const input = this.element.getElementsByTagName('input')[0];
    mobiInit(input, {
      type: type,
    });
  }

}).reopenClass({positionalParams: ['node', 'option', 'handleEvents']});
