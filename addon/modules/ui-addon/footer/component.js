import Component from 'ember-component';
import layout from './template';
import {tempI18n} from '../../helpers/temp-i18n';

export default Component.extend({
  layout,
  tagName:'footer',

  actions: {
    openPage(){
      confirm(tempI18n('UI_GoToCForm')) && window.open('https://www.cform.io/');
    }
  }
});
