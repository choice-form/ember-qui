import Component from 'ember-component';
import layout from './template';
import {htmlSafe} from 'ember-string';
import set from 'ember-metal/set';
import {later} from 'ember-runloop';

export default Component.extend({

  layout,
  tagName: '',

  transtion: htmlSafe(`
    opacity : 0; 
    transform : translate3d(0,20px,0);
  `),

  didInsertElement(){
    const transtionIn = htmlSafe('opacity : 1; transform : translate3d(0,-105%,0)');

    later(() => {
      set(this, 'transtion', transtionIn);
    }, 500);
  }
});
