import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import {htmlSafe} from 'ember-string';


export default Component.extend({
  layout,

  header: null,

  /**
   * 设置顶部的Class名称，便于加载其相应的css
   */
  className : computed('header', function () {
    return get(this, 'header').nodeName;
  }),
  classNameBindings: ['className'],


  /**
   * 从上层获取相关数据，并往下传
   */
  this_header:computed('header', function () {
    return get(this, 'header');
  }),

  /**
   * 获取问题描述
   */
  this_questionDescribe: computed('header', function () {
    const questionDescribe = get(this, 'header').questionDescribe;
    if(!questionDescribe) return;
    const html = htmlSafe(`<pre>${questionDescribe}</pre>`);
    return html;
  }),


  /**
   * 获取所有的图片
   */
  this_images: computed('header', function () {
    const images = get(this, 'header').images;
    if(images.length == 0) return ;
    let html = '';
    for(var i = 0; i < images.length; i++){
      html = html + `<img src=${images[i]} />`;
    }
    console.log(html);

    return htmlSafe(`<div class="imagesBox">${html}</div>`);
  }),

  /**
   * 获取题型名称
   */
  this_typeName: computed('header', function () {
    const typeName = get(this, 'header').typeName;
    const html = htmlSafe(`<span>${typeName}</span>`);

    return typeName ? html : null;
  }),

});
