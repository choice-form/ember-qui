import Component from 'ember-component';
import layout from './template';
import computed, { filterBy, gt } from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import Masonry from 'masonry';
import { scheduleOnce } from 'ember-runloop';

export default Component.extend({
  layout,
  classNames:['picture-wrapper'],

  init(){
    this._super(...arguments);
  },

  actions: {
    /**
     * click事件
     */
    handleOptionClick(option, e){
      !this.handleEvents.handleOptionClick(option, get(this, 'node'))
      && e.preventDefault();
    },
  },



}).reopenClass({positionalParams: ['node', 'handleEvents']});
