import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';


export default Component.extend({
  layout,

  classNames: ['submit-actions'],

  actions:{
    handlePrevClick() {
      get(this, 'handlePrevClick')();
    },

    handleNextClick() {
      const article =  document.getElementsByTagName('article')[0];
      article.setAttribute('class', 'choiceform ono-by-one');
      get(this, 'handleNextClick')();
    },
  }
})
