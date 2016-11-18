import Component from 'ember-component';
import layout from './template';
import imagesLoaded from 'imagesloaded';
import {scheduleOnce, later} from 'ember-runloop';
import {alias} from 'ember-computed';
import set from 'ember-metal/set';

export default Component.extend({
  layout,
  tagName: '',

  isLoading: alias("_thisLoading"),

  _thisLoading: true,


  removeLoading(){
    imagesLoaded('body', ()=>{
      later(() => {
        set(this, '_thisLoading', false);
      }, 3000);
    });
  },

  didInsertElement(){

    scheduleOnce('afterRender', this, 'removeLoading');
  }
}).reopenClass({positionalParams: ['question']});
