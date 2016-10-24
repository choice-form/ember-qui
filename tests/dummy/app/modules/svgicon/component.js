import Component from 'ember-component';
import Clipboard from 'clipboard';
import { bind } from 'ember-runloop';

export default Component.extend({
  didInsertElement() {
    this.clipboard = new Clipboard(this.element.querySelectorAll('use'), {
      text(trigger) { return trigger.href; }
    });

    this.notifyCopied = bind(this, this._notifyCopied);
    this.clipboard.on('success', this.notifyCopied);
  },

  _notifyCopied(event) {
    this.notification.success(`Copy to clipboard:&nbsp;<strong>${event.text}</strong>`);
  },

  willDestroy() {
    this.clipboard.destroy();
  }
});
