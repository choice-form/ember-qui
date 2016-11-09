import Component from 'ember-component';
import layout from './template';
import computed, { alias } from 'ember-computed';
import get from 'ember-metal/get';
import inject from 'ember-service/inject';

export default Component.extend({
  layout,
  tagName: 'label',

  attributeBindings: ['for'],

  for: computed('option.uuid', function () {
    const uuid = get(this, 'option.uuid');
    return uuid;
  }),

  uiService: inject('service/icon'),

  svg: computed('option.selected', 'option.icon', function() {
    return get(this, 'uiService').getOptionSvg(
      get(this, 'option.selected'), get(this, 'option.icon')
    );
  }),

  selected: computed('option.selected', function () {
    const selected = get(this, 'option.selected');
    return selected;
  }),

  emoji: computed('option.emoji', function () {
    const emoji = get(this, 'option.emoji');
    return emoji;
  }),

  text: computed('option.text', function () {
    const selected = get(this, 'option.text');
    return selected;
  }),

  size: '16px',
  viewBox: '16',

}).reopenClass({positionalParams: ['option']});
