import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import {htmlSafe} from 'ember-string';
import inject from 'ember-service/inject';

export default Component.extend({
  layout,
  tagName: '',
  uiService: inject('service/icon'),
  /**
   * 设置选项的svg icon
   */
  svg: computed('option.selected', 'option.icon', function () {
    const uiService = get(this, 'uiService');
    const selected = get(this, 'option.selected');
    const icon = get(this, 'option.icon');
    return uiService.getOptionSvg(selected, icon);
  }),

  didInsertElement() {
  }
}).reopenClass({positionalParams: ['option']});
