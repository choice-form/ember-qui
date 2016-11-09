import Component from 'ember-component';
import layout from './template';

export default Component.extend({
  layout,

  didInsertElement(){
     // 先删除control节点
    this.element.parentNode.parentNode.remove();
  }
}).reopenClass({positionalParams: ['node', 'handleEvents']});
