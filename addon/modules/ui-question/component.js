import Ember from 'ember';
import Component from 'ember-component';
import layout from './template';

export default Component.extend({
  layout, tagName: '',

  didInsertElement() {
    Ember.$(window).scrollTop(0);
  },

  willDestroyElement() {
    Ember.$(window).scrollTop(0);
  }
}).reopenClass({ positionalParams: ['question'] });
