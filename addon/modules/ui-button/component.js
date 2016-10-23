import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import {htmlSafe} from 'ember-string';


export default Component.extend({
  layout,

  classNames: ['ui-button'],

  actions:{
    prev() {
      get(this, 'button.prevButton.handlePrev')();
    },

    next() {
      get(this, 'button.nextButton.handleNext')();
    },
  }

}).reopenClass({positionalParams: ['button']});
