import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import setAttachmentPosition from '../../lib/setAttachmentPosition';

export default Component.extend({
  layout,

  didInsertElement(){
    this.element.parentNode.parentNode.remove();
    setAttachmentPosition(null);
  }
}).reopenClass({positionalParams: ['node', 'handleEvents']});
