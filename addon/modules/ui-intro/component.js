import Component from 'ember-component';
import layout from './template';
import styles from './styles';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import {htmlSafe} from 'ember-string';

export default Component.extend({
  layout, styles,
  tagName:'',

  /**
   * 获取所有的图片
   */
  images: computed('intro.images', function () {
    const images = get(this, 'intro.images');
    if( images && images.length ){
      return htmlSafe(images.map(function (item) {
        return `<img src=${item} />`
      }).join(''));
    }else return '';
  }),

}).reopenClass({ positionalParams: ['intro'] });
