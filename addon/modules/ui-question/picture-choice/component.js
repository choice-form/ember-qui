import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import Masonry from 'masonry';
import { scheduleOnce } from 'ember-runloop';

export default Component.extend({
  layout,
  classNames:['picture-wrapper'],

  actions: {
    /**
     * click事件
     */
    handleOptionClick(option, e){
      !this.handleEvents.handleOptionClick(option, get(this, 'node'))
      && e.preventDefault();
    },
  },

  picNewMasonry(){
    const element = this.element.getElementsByClassName('picture-layout')[0];
    this.newMasonry = new Masonry(element);
  },

  didInsertElement() {
    const showStyle = get(this, 'node.showStyle');
    if (showStyle == 'pinterest') {
      scheduleOnce('afterRender',this,'picNewMasonry');
    }
  },


  willDestroy(){
    this.newMasonry && this.newMasonry.remove(this.element);
  }


}).reopenClass({positionalParams: ['node', 'handleEvents']});
