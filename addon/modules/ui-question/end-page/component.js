import Component from '@ember/component';
import layout from './template';
import { tempI18n } from '../../helpers/temp-i18n';

export default Component.extend({
  layout,
  classNames:['ui-end-page'],

  option:{
    text: tempI18n('UI_GetGiftIn15Min'),
    icon: 'round-e-info', // 选项的Icon
  },

}).reopenClass({positionalParams: ['node', 'handleEvents']});
