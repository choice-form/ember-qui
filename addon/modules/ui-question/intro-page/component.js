import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import setAttachmentPosition from '../../lib/setAttachmentPosition';

export default Component.extend({
  layout,

  didRender(){
    this.element.parentNode.parentNode.remove();
    if(!get(this, 'node.images') || get(this, 'node.images').length < 1){
      return ;
    }
    setAttachmentPosition();

  }
});
