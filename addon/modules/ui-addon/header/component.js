import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import {htmlSafe} from 'ember-string';

export default Component.extend({
  layout,
  tagName:'',
  /**
   * 获取所有的图片
   */
  this_images: computed('header.images', function () {
    const images = get(this, 'header.images');
    if( images && images.length ){
      return htmlSafe(`<div class="attachment">` + images.map(function (item) {
          return `<img src=${item} />`
        }).join('') + `</div>`);
    }else return '';
  }),

}).reopenClass({positionalParams: ['header']});
