import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import inject from 'ember-service/inject';

export default Component.extend({
  layout,
  tagName: '',

  uiService: inject('service/icon'),

  svg: computed('option.selected', 'option.icon', function() {
    return get(this, 'uiService').getOptionSvg(
      get(this, 'option.selected'), get(this, 'option.icon')
    );
  })
}).reopenClass({positionalParams: ['option']});
