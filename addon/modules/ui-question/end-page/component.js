import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import setAttachmentPosition from '../../lib/setAttachmentPosition';

export default Component.extend({
  layout,

  option:{
    text: '抽奖与领奖的有效时间为15分钟，请在结束答卷后15分钟内前往。',
    uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
    icon: 'round-e-info', // 选项的Icon
  },

  didInsertElement(){
    const row = document.getElementsByClassName('row')[0];
    const control = row.getElementsByClassName('control')[0];
    setAttachmentPosition(control);
  }
}).reopenClass({positionalParams: ['node', 'handleEvents']});
