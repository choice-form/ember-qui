import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import {htmlSafe} from 'ember-string';


export default Component.extend({
  layout,

  /**
   * 获取所有的图片
   */
  this_images: computed('header.images', function () {
    const images = get(this, 'header.images');
    if(images.length == 0) return ;
    let html = '';
    for(var i = 0; i < images.length; i++){
      html = html + `<img src=${images[i]} />`;
    }
    console.log(html);

    return htmlSafe(`<div class="imagesBox">${html}</div>`);
  }),

}).reopenClass({positionalParams: ['header']});
