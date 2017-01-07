import Component from 'ember-component';
import layout from './template';

export default Component.extend({
  layout,
  tagName:'footer',

  actions: {
    openPage(){
      confirm('是否跳转到巧思科技主页？') && window.open('https://www.cform.io/');
    }
  }
});
