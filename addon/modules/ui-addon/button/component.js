import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';

let num = 1;
export default Component.extend({
  layout,

  classNames: ['submit-actions'],

  actions:{
    handlePrevClick() {
      get(this, 'handlePrevClick')();
    },

    handleNextClick() {
      num ++ ;
      const article =  document.getElementsByTagName('article')[0];
      if(num%2 == 0){
        article.setAttribute('class', 'choiceform ono-by-one');
      }else{
        article.setAttribute('class', 'choiceform');
      }

      get(this, 'handleNextClick')();
    },
  }
})
