import Component from 'ember-component';
import layout from './template';
import inject from 'ember-service/inject';
import computed from 'ember-computed';
import set from 'ember-metal/set';

export default Component.extend({
  layout,
  tagName:'',
  iconService: inject("icon-loader"),

  rateOptions: computed(function() {
    const rateOptions = this.get('node.rateOptions');
    const num = Math.floor(rateOptions.length / 2) - rateOptions.length + 1;

    return rateOptions.map((rateOption, index) => {
      set(rateOption, 'value', num + index);
      return rateOption;
    });
  }),

  didInsertElement() {
    this._super(...arguments);
    this.get('rateOptions').forEach(rateOption => {
      this.get('iconService').getIconByUrl(rateOption.url, rateOption.url)
        .then(icon => set(rateOption, 'svg', icon.outerHTML));
    });
  },

  actions: {
    handleOptionInput(value, option) {
      const node = this.get('node');

      if (value == 0) {
        return this.handleEvents.handleOptionInput(value, option, node);
      }

      if (value == option.value) {
        value = value > 0 ? value - 1 : value + 1;
      }
      this.handleEvents.handleOptionInput(value, option, node);
    }
  }
}).reopenClass({positionalParams: ['node','handleEvents']});
