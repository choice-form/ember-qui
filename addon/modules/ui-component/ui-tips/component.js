import Component from '@ember/component';
import layout from './template';
import { set } from '@ember/object';
import { get } from '@ember/object';


export default Component.extend({
  layout,
  tagName:'',
  didInsertElement(){
    this._super(...arguments);
    const storage = get(this, 'storage');
    if(localStorage.getItem(storage)){
      set(this, 'showTipImage', false);
    }else {
      set(this, 'showTipImage', true);
      localStorage.setItem(storage,true);
    }
  },

  actions: {
    closeTip(){
      set(this, 'showTipImage', false);
    },
  }
});
