import Component from 'ember-component';
import set from 'ember-metal/set';
import get from 'ember-metal/get';
import QRCode from 'qrcode';

export default Component.extend({
  tagName: 'canvas',
  classNames: ['qr-code'],
  attributeBindings: ['width', 'height'],
  width: 360,
  height: 360,
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
    const width = 240;
    const height = 240;

    const qr = new QRCode(0, 1);
    qr.addData(data);
    qr.make();

    const size = qr.getModuleCount();
    const cwidth = width / size;
    const cheight = height / size;
    const pad = 0;

    function cx(x) {return x * cwidth;}
    function cy(y) {return y * cheight;}

    ctx.fillStyle = document.body.currentStyle.color;

    ctx.font = "16px Arial";
    //设置字体填充颜色
    ctx.textAlign="center";
    ctx.fillText(data, 125, 280);
    ctx.fillStyle = get(this, 'dark');
    for (let row = 0; row < size; ++row)
      for (let col = 0; col < size; ++col)
        if (qr.isDark(row, col))
          ctx.fillRect(cx(row) + pad, cy(col) + pad, cwidth - pad, cheight - pad);

  }
});
