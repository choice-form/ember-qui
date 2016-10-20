import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Component.extend({
  layout,

  question: null,

  /**
   * 设置顶部的Class名称，便于加载其相应的css
   */
  className : computed('question', function () {
    return get(this, 'question').nodeName;
  }),
  classNameBindings: ['className'],


  /**
   * 从上层获取相关数据，并往下传
   */
  this_question:computed('question', function () {
    return get(this, 'question');
  }),

  didReceiveAttrs(attrs){
    set(this, 'this_prevButton', get(this, 'this_question').prevButton);
  }
});
