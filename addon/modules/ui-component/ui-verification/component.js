import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { get } from '@ember/object';
import { tempI18n } from '../../helpers/temp-i18n';

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
    if(type == 'password') return tempI18n('UI_InputPsw');
    if(type == 'white_list') return tempI18n('UI_InputVerifyContent');
    return tempI18n('UI_InputPhoneNum');
  }),

  _type: computed('verificationType', function () {
    const type = get(this, 'verificationType');
    if(type == 'password') return 'password';
    if(type == 'white_list') return 'text';
    return 'tel';
  }),


  _pass_white: computed('verificationType', function () {
    const type = get(this, 'verificationType');
    return ['password','white_list'].indexOf(type) > -1;
  }),

})
