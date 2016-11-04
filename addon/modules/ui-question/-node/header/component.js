import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import {htmlSafe} from 'ember-string';

/**
 * 问卷头部内容
 *
 * @class -question-header(问卷头部)
 */

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

/**
 * 标题
 *
 * @property {String} title
 */

/**
 * 描述文字
 *
 * @property {String} description
 */

/**
 * images为数组对象,可以传多张图片
 *
 * @property {Object} images
 * @property {Number} images.ratio - 图片的显示比例
 * @property {String} images.natural - 原始图片的URL地址
 * @property {String} images.thumbnail - 缩列图URL地址
 * @example
 ```
 images[
 {
  ratio: 0.667,
  natural: 'http://cform.io?uuqna712321202kks-720.jpg',
  thumbnail: 'http://cform.io?uuqna712321202kks-320.jpg',
 }
 ]
 ```
 */
