import Component from 'ember-component';
import layout from './template';
import imagesLoaded from 'imagesloaded';
import {scheduleOnce, later} from 'ember-runloop';
import set from 'ember-metal/set';

export default Component.extend({
  layout,
  tagName: '',
  isLoading: true,

  removeLoading(){
    imagesLoaded('body', ()=>{
      later(() => {
        set(this, 'isLoading', false);
      }, 500);
    });
  },

  didInsertElement(){
    scheduleOnce('afterRender', this, 'removeLoading');
  }
}).reopenClass({positionalParams: ['question']});
