import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { get } from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',

  multiImages: computed('intro.images', function () {
    return get(this ,'intro.images').length > 1;
  }),

  hasWelcomeUrl: computed('intro.welcomeUrl', function () {
    return !!get(this, 'intro.welcomeUrl');
  }),

  actions: {
    handleNextClick(){
      this.intro.handleEvents.handleNextClick('go');
    }
  }

}).reopenClass({positionalParams: ['intro']});
