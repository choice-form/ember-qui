import Component from 'ember-component';
import layout from './template';
import {htmlSafe} from 'ember-string';
import set from 'ember-metal/set';
import {later} from 'ember-runloop';

export default Component.extend({

  layout,

  didInsertElement(){
    later(()=>{
      set(this, 'opacity', 1);
      set(this, 'translateY', -105);
    }, 300);
  },
});
