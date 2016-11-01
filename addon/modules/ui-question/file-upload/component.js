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

  this_icon :computed('option.selected', 'option.icon', function () {
  return get(this, 'option.selected') ? 'refresh' : get(this, 'option.icon');
}),

  uploadState:computed('option.selected', function () {
    return get(this, 'option.selected') ? ' success' : null;
  }),

  uploadText : computed('option.selected', function () {
    return get(this, 'option.selected') ? "refresh upload" : "Upload Picture";
  }),

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
