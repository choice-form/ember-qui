import Component from 'ember-component';
import set from 'ember-metal/set';
import get from 'ember-metal/get';
import QRCode from 'qrcode';

export default Component.extend({
  tagName: 'canvas',
  classNames: ['qr-code'],
  attributeBindings: ['width', 'height'],
  width: 270,
  height: 270,
  light: 'white',
  dark: 'black',
  ctx: null,
  data: '',

  didInsertElement() {
    HTMLElement.prototype.__defineGetter__("currentStyle", function () {
      return this.ownerDocument.defaultView.getComputedStyle(this, null);
    });
    const backgroundColor = document.body.currentStyle['background-color'];
    const color = document.body.currentStyle.color;

    set(this, 'light', backgroundColor);
    set(this, 'dark', color);
    set(this,'ctx', this.element.getContext('2d'));
    return this.draw();
  },

  empty() {
    const ctx = get(this, 'ctx');
    ctx.fillStyle = get(this, 'light');
    return ctx.fillRect(0, 0, get(this, 'width'), get(this, 'height'));
  },

  draw() {
    this.empty();
    const data = get(this, 'data');
    const ctx = get(this, 'ctx');
    const width = get(this, 'width');
    const height = get(this, 'height');

    const qr = new QRCode(0, 1);
    qr.addData(data);
    qr.make();

    const size = qr.getModuleCount();
    const cwidth = width / size;
    const cheight = height / size;
    const pad = 0;

    function cx(x) {return x * cwidth;}
    function cy(y) {return y * cheight;}

    ctx.fillStyle = get(this, 'dark');
    for (let row = 0; row < size; ++row)
      for (let col = 0; col < size; ++col)
        if (qr.isDark(row, col))
          ctx.fillRect(cx(row) + pad, cy(col) + pad, cwidth - pad, cheight - pad);
  }
});
