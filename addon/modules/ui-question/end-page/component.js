import Component from 'ember-component';
import layout from './template';

export default Component.extend({
  layout,
  classNames:['ui-end-page'],

  option:{
    text: '抽奖与领奖的有效时间为15分钟，请在结束答卷后15分钟内前往。',
    icon: 'round-e-info', // 选项的Icon
  },

  didInsertElement(){
    // 如果没有奖励，删除control节点
    !this.node.hasReward && this.element.parentNode.remove();
  }

}).reopenClass({positionalParams: ['node', 'handleEvents']});
