import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import set from 'ember-metal/set';

export default Component.extend({
  layout,
  classNames:['ui-verification'],
  attributeBindings:['data-render-id'],
  'data-render-id': computed.oneWay('node.renderId'),


  actions: {
    captchaClick() {
      set(this, 'captcha', true)
    }
  }



}).reopenClass({ positionalParams: ['node','handleEvents']});
