import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {htmlSafe} from 'ember-string';
import mobiInit from '../../../lib/mobile-factory'

let readOnce = true;
let minTextareaHeight = 0;
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

  svg: computed('option.inputRule', function () {
    const icon = `#${get(this, 'option.inputRule')}`;
    return htmlSafe(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
        <use xlink:href=${icon}></use>
      </svg>`);
  }),


  actions: {
    /**
     * change事件Input
     */
    handleOptionInput(e){
      const value = e.currentTarget.value;
      console.log(value);
      set(this, 'option.value', value);
      this.handleEvents.handleOptionInput(get(this, 'option'), get(this, 'node'));
    },


    /**
     * textareaAutoResize事件forTextarea
     */
    textareaAutoResize(e){
      if(readOnce){
        minTextareaHeight = e.currentTarget.offsetHeight;
        readOnce = false;
      }
      console.log(e.currentTarget.scrollHeight + 2 + 'px');
      e.currentTarget.style.height = minTextareaHeight + 'px';
      e.currentTarget.style.height = e.currentTarget.scrollHeight + 2 + 'px';
    },
  },

  didRender(){
    const mobiService = get(this, 'mobiService');
    const type = get(this, 'option.inputRule');
    const input = this.element.getElementsByTagName('input')[0];
    mobiInit(input, {
      type: type,
      onInit: () => {
        input.setAttribute('class', 'ui-menu');
      }
    });
  }

}).reopenClass({positionalParams: ['node', 'option', 'handleEvents']});
