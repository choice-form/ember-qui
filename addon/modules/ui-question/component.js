import Component from 'ember-component';
import layout from './template';
import imagesLoaded from 'imagesloaded';
import {scheduleOnce, later} from 'ember-runloop';
import {alias} from 'ember-computed';
import set from 'ember-metal/set';
import {addClass, removeClass} from '../lib/attribute-manage';
import mobiScrollStyle from '../lib/color-mobiScroll-manage';
import themesColor from '../lib/color-theme-manage';

export default Component.extend({
  layout,
  tagName: '',

  isLoading: alias("_thisLoading"),

  _thisLoading: true,


  removeLoading(){
    const body = document.getElementsByTagName('body')[0];
    addClass(body, 'noscroll');
    imagesLoaded('body', ()=>{
      later(() => {
        set(this, '_thisLoading', false);
        removeClass(body, 'noscroll')
      }, 1000);
    });
  },

  didInsertElement(){
    scheduleOnce('afterRender', this, 'removeLoading');

    //设置mobilescroll的颜色
    const primary= 'rgba(128,128,128,1)';
    const secondary= 'rgba(255,255,255,1)';
    const contrast= 'rgba(202,32,39,1)';
    const neutrals= 'rgba(128,128,128,1)';
    mobiScrollStyle(primary,secondary,contrast,neutrals);
    themesColor(primary,secondary,contrast,neutrals);

  }
}).reopenClass({positionalParams: ['question']});
