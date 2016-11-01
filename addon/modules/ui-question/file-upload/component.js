import Component from 'ember-component';
import computed from 'ember-computed';
import layout from './template';
import {htmlSafe} from 'ember-string';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Component.extend({
  layout,

  classNameBindings: ['priority'],
  priority: computed('node.quesType', function () {
    const quesType = `ui-${get(this, "node.quesType")}`;
    return quesType;
  }),

  uploadIcon: computed('option.icon', function () {
    const icon = get(this, 'option.icon');
    return htmlSafe(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64">
        <use xlink:href="#upload-image"></use>
      </svg>`);
  }),

  svg: computed('option.icon', function () {
    const icon = get(this, 'option.icon');
    return htmlSafe(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
        <use xlink:href="#${icon}"></use>
      </svg>`);
  }),

  clearSvg: htmlSafe(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
        <use xlink:href="#trash"></use>
      </svg>`),

  actions: {
    /**
     * change事件Input
     */
    handleOptionInput(e){
      const value = e.currentTarget.value;
      console.log(value);
      set(this, 'option.value', value);
      set(this, 'option.selected', true);
      this.handleEvents.handleOptionInput(get(this, 'option'), get(this, 'node'));
    },
  },

}).reopenClass({positionalParams: ['node', 'option', 'handleEvents']});
