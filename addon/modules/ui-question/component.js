import $ from 'jquery';
import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout, tagName: '',

  didInsertElement() {
    $(window).scrollTop(0);
  },

  willDestroyElement() {
    $(window).scrollTop(0);
  }
}).reopenClass({ positionalParams: ['question'] });
