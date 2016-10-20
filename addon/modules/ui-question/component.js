import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get'
import set from 'ember-metal/set'
import inject from 'ember-service/inject';

export default Component.extend({
  layout,
  uiService: inject('ui'),

  componentName: computed('question.type', function() {
    return `ui-question/${get(this, 'question.type')}`;
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    const uiService = get(this, 'uiService');
    this.api = uiService.generateAPI(get(this, 'question.type'));
  },

  actions: {
    submit() {
      console.log(get(this, 'question'), get(this, 'api'));
    }
  }
}).reopenClass({ positionalParams: ['question'] });
