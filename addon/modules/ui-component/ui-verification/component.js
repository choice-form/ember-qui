import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';

export default Component.extend({

  layout,
  classNames: ['ui-verification'],
  attributeBindings: ['renderId'],

  size: '64px',
  viewBox: '40',

  _icon: computed('verificationType', function () {
    const type = get(this, 'verificationType');
    if(type == 'white_list') return 'password';
    return type;
  }),

  unless_pass_white: computed('verificationType', function () {
    const type = get(this, 'verificationType');
    return ['password','white_list'].indexOf(type) < 0
  }),

  _placeholder: computed('verificationType', function () {
    const type = get(this, 'verificationType');
    if(type == 'password') return '请输入密码';
    if(type == 'white_list') return '请输入待验证内容';
    return '请输入手机号';
  }),

  _pass_white: computed('verificationType', function () {
    const type = get(this, 'verificationType');
    return ['password','white_list'].indexOf(type) > -1;
  }),

})
