import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import computed from 'ember-computed';
import {htmlSafe} from 'ember-string';

export default Component.extend({
  layout,
  tagName:'',

  svg:computed('option.icon', function () {
    return htmlSafe(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
        <use xlink:href=#${get(this, 'option.icon')}></use>
      </svg>`);
  }),

  actions: {
    /**
     * click事件
     */
    handleOptionClick(e){
      !this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'node'))
      &&  e.preventDefault();
    },
  },

}).reopenClass({ positionalParams: ['node','option','handleEvents']});
