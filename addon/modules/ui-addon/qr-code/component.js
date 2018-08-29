import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import QRCode from 'qrcode';
import { reads } from '@ember/object/computed';
import layout from './template';

export default Component.extend({
  layout,
  classNames: ['qr-code'],
  attributeBindings: ['width', 'height'],
  size: 360,
  width: reads('size'),
  height: computed('size', 'padding', function () {

    return get(this, 'size') + get(this, 'padding') / 4 + 16
  }),
  light: 'white',
  dark: 'black',
  ctx: null,
  data: '',
  padding: 60,

  didInsertElement() {
    HTMLElement.prototype.__defineGetter__("currentStyle", function () {
      return this.ownerDocument.defaultView.getComputedStyle(this, null);
    });
    const backgroundColor = document.body.currentStyle['background-color'];
    const color = document.body.currentStyle.color;

    set(this, 'light', backgroundColor);
    set(this, 'dark', color);

    set(this, 'ctx', this.element.querySelector('canvas').getContext('2d'));

    return this.draw();
  },

  empty() {
    const ctx = get(this, 'ctx');
    ctx.fillStyle = get(this, 'light');
    return ctx.fillRect(0, 0, get(this, 'size'), get(this, 'size'));
  },

  drawImage() {
    const canvas = this.element.querySelector('canvas');
    const url = canvas.toDataURL();
    this.element.querySelector('img').setAttribute('src', url);
    canvas.style.display = 'none';
  },

  draw() {
    this.empty();
    const data = get(this, 'data');
    const ctx = get(this, 'ctx');
    const width = get(this, 'size') - get(this, 'padding');
    const height = get(this, 'size') - get(this, 'padding');

    const qr = new QRCode(0, 1);
    qr.addData(data);
    qr.make();

    const size = qr.getModuleCount();
    const cwidth = width / size;
    const cheight = height / size;
    const pad = 0;

    function cx(x) {
      return x * cwidth;
    }

    function cy(y) {
      return y * cheight;
    }

    ctx.fillStyle = document.body.currentStyle.color;

    ctx.font = "16px Arial";
    //设置字体填充颜色
    ctx.textAlign = "center";
    if (this.showText) {
      ctx.fillText(data, get(this, 'size') / 2, (get(this, 'height') - get(this, 'padding') / 2));
    }
    ctx.fillStyle = get(this, 'dark');
    const offestX = (get(this, 'size') - width) / 2;
    const offestY = (get(this, 'size') - height) / 2;
    ctx.translate(offestX, offestY);
    for (let row = 0; row < size; ++row) {
      for (let col = 0; col < size; ++col) {
        if (qr.isDark(row, col)) {
          ctx.fillRect(cx(row) + pad, cy(col) + pad, cwidth - pad, cheight - pad);
        }
      }
    }

    this.drawImage();
  }
});
