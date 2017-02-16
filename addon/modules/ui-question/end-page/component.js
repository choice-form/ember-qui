import Component from 'ember-component';
import layout from './template';

export default Component.extend({
  layout,
  classNames:['ui-end-page'],

  option:{
    text: '抽奖与领奖的有效时间为15分钟，请在结束答卷后15分钟内前往。',
    icon: 'round-e-info', // 选项的Icon
  },

}).reopenClass({positionalParams: ['node', 'handleEvents']});
