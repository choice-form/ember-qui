import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import {htmlSafe} from 'ember-string';



export default Component.extend({
  layout,
  tagName:'',

  imageTop:computed('header',function () {
    const header = get(this,'header');
    if(['intro-page','end-page'].indexOf(header.quesType) > -1){
      return true;
    }else{
      return false;
    }
  }),


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
 * UiHeaderComponent
 *
 ``` javascript
 {{ui-component/ui-header intro imageTop=true}}
 ```
 *
 * @class UiHeaderComponent
 */


/**
 * header
 *
 * @property {Object} header
 * @property {Array} header.images - header的图片
 * @example
 ```javascript
 image:{
      ratio: image.ratio,
      thumbnail: image.thumbnail,
      image: image.natural,
 }
 ```
 * @property {Bool} header.isMust - 是否必选
 * @property {Number} header.number - 当前是第几题
 * @property {String} header.title - 问卷标题
 * @property {String} header.description - 问卷描述
 */

