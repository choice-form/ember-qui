import Component from 'ember-component';
import layout from './template';

export default Component.extend({
  layout,
  tagName: '',


  actions: {
    handleNextClick(){
      this.intro.handleEvents.handleNextClick('111');
    }
  }


}).reopenClass({positionalParams: ['intro']});
