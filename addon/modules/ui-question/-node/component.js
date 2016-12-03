import Component from 'ember-component';
import layout from './template';
import { HEADER_META, SPECIAL_TYPES } from './constants';
import computed, { reads } from 'ember-computed';
import get, { getProperties } from 'ember-metal/get'

export default Component.extend({
  layout,
  classNames:['row'],

  classNameBindings: ['typeClassName'],
  typeClassName: computed('node.quesType', function() {
    const type = get(this, 'node.quesType');
    return type ? `data-${type}` : null;
  }).readOnly(),

  attributeBindings: ['data-render-id'],
  'data-render-id': reads('node.renderId'),

  quesType: computed('node.quesType', function() {
    const type = get(this, 'node.quesType');
    return (['icon', 'gender'].indexOf(type) > -1) ? 'icon' : type;
  }).readOnly(),

  headerData: computed('node', function() {
    return getProperties(get(this, 'node'), HEADER_META);
  }).readOnly(),

  componentName: computed('node.quesType', function() {
    return `ui-question/${get(this, 'node.quesType')}`;
  }).readOnly(),

  isSpecialComponent: computed('node.quesType', function() {
    return SPECIAL_TYPES.indexOf(get(this, 'node.quesType')) > -1;
  }).readOnly()
}).reopenClass({ positionalParams: ['node', 'handleEvents'] });
