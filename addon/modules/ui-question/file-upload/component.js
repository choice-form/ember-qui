import Component from 'ember-component';
import computed from 'ember-computed';
import layout from './template';
import {htmlSafe} from 'ember-string';
import get from 'ember-metal/get';

export default Component.extend({
  layout,

  classNameBindings: ['priority'],
  priority: computed('node.quesType', function () {
    const quesType = `ui-${get(this, "node.quesType")}`;
    return quesType;
  }),

  svg: computed('option.icon', function () {
    const icon = get(this, 'option.icon');
    return htmlSafe(`<svg style="display:block" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
        <use xlink:href="#${icon}"></use>
      </svg>`);
  }),

  actions: {
    /**
     * click事件
     */
    handleOptionClick(){
      this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'node'));
    },
  },

}).reopenClass({ positionalParams: ['node','option','handleEvents']});
