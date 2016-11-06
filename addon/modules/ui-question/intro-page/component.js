import Component from 'ember-component';
import layout from './template';
import setAttachmentPosition from '../../lib/setAttachmentPosition';

export default Component.extend({
  layout,

  didInsertElement(){
     // 先删除control节点
    this.element.parentNode.parentNode.remove();
    // 再将header移动到row节点的底部
    setAttachmentPosition(null);
  }
}).reopenClass({positionalParams: ['node', 'handleEvents']});
