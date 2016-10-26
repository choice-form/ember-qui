import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import {htmlSafe} from 'ember-string';


export default Component.extend({
  layout,

  classNames: ['submit-actions'],

  actions:{
    handlePrevClick() {
      get(this, 'handlePrevClick')();
    },

    handleNextClick() {
      get(this, 'handleNextClick')();
    },
  }
}).reopenClass({positionalParams: ['button']});
