import { computed } from '@ember/object';
import { get, getProperties } from '@ember/object';
import Component from '@ember/component';

import { HEADER_META, SPECIAL_TYPES } from './constants';
import layout from './template';

export default Component.extend({
  layout,
  classNames:['row'],

  quesType: computed('node.quesType', function() {
    const type = get(this, 'node.quesType');
    return (['icon', 'gender'].indexOf(type) > -1) ? 'icon' : type;
  }).readOnly(),

  headerData: computed('node', 'node.reminder', function() {
    return getProperties(get(this, 'node'), HEADER_META);
  }).readOnly(),

  componentName: computed('node.quesType', function() {
    return `ui-question/${get(this, 'node.quesType')}`;
  }).readOnly(),

  isSpecialComponent: computed('node.quesType', function() {
    return SPECIAL_TYPES.indexOf(get(this, 'node.quesType')) > -1;
  }).readOnly()
}).reopenClass({ positionalParams: ['node', 'handleEvents'] });
