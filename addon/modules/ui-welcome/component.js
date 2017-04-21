import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';

export default Component.extend({
  layout,
  tagName: '',

  multiImages: computed('intro.images', function () {
    return get(this ,'intro.images').length > 1;
  }),

  actions: {
    handleNextClick(){
      this.intro.handleEvents.handleNextClick('go');
    }
  }


}).reopenClass({positionalParams: ['intro']});
