import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';


export default Component.extend({
  layout,
  tagName: '',

  isShowException : false,

  actions:{
    isShowException() {
      set(this, 'isShowException', !get(this,'isShowException'));
    },
  }
})
