import Component from 'ember-component';
import layout from './template';
import imagesLoaded from 'imagesloaded';
import {scheduleOnce, later} from 'ember-runloop';
import {alias} from 'ember-computed';
import set from 'ember-metal/set';
import {addClass, removeClass} from '../lib/attributeManger';

export default Component.extend({
  layout,
  tagName: '',

  isLoading: alias("_thisLoading"),

  _thisLoading: true,


  removeLoading(){
    const body = document.getElementsByTagName('body')[0];
    addClass(body, 'noscroll')
    $('body').addClass('noscroll');
    imagesLoaded('body', ()=>{
      later(() => {
        set(this, '_thisLoading', false);
        removeClass(body, 'noscroll')
      }, 1000);
    });
  },

  didInsertElement(){
    scheduleOnce('afterRender', this, 'removeLoading');
  }
}).reopenClass({positionalParams: ['question']});
