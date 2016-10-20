import Component from 'ember-component';
import layout from './template';
import computed, { alias } from 'ember-computed';
import get from 'ember-metal/get';

export default Component.extend({
  layout,

  isSelected: computed('api.selectedId', function() {
    return get(this, 'option.id') === get(this, 'api.selectedId');
  }),

  selectedId: alias('api.selectedId'),

  actions: {
    select() {
      this.api.changeSelection(get(this, 'option.id'));
    }
  }
}).reopenClass({ positionalParams: ['option', 'api'] });
