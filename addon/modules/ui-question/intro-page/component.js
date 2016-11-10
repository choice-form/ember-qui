import Component from 'ember-component';
import layout from './template';

export default Component.extend({
  layout,

  didRender(){
     // 先删除control节点
    this.element.parentNode.remove();
  }
}).reopenClass({positionalParams: ['node', 'handleEvents']});
