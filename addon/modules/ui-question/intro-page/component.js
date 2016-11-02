import Component from 'ember-component';
import layout from './template';
import setAttachmentPosition from '../../lib/setAttachmentPosition';

export default Component.extend({
  layout,

  didInsertElement(){
    this.element.parentNode.parentNode.remove();
    setAttachmentPosition(null);
  }
}).reopenClass({positionalParams: ['node', 'handleEvents']});
