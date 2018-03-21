import Component from 'ember-component';
import layout from './template';
import inject from 'ember-service/inject';
import computed from 'ember-computed';
import set from 'ember-metal/set';
import { later } from 'ember-runloop';
import Swiper from 'swiper';

export default Component.extend({
  layout,
  tagName:'',
  iconService: inject("icon-loader"),

  rateOptions: computed('options.@each.value', function() {
    const result = this.get('options').reduce((acc, option) => {
      acc[option.value] ? acc[option.value].push(option) : acc[option.value] = [option];
      return acc;
    }, {});

    return this.get('node.rateOptions').map(rateOption => {
      set(rateOption, 'result', result[rateOption.value] || []);
      return rateOption;
    });
  }),

  currentOption: computed(function() {
    return this.get('options')[0];
  }),

  didInsertElement() {
    this._super(...arguments);

    this.get('rateOptions').forEach(rateOption => {
      this.get('iconService').getIconByUrl(rateOption.url, rateOption.url)
        .then(icon => set(rateOption, 'svg', icon.outerHTML));
    });

    const swiper = new Swiper('.swiper-container', {
      allowSwipeToNext: false,
      pagination: '.swiper-pagination',
      onSlideChangeEnd: (swiper) => {
        const option = this.get('options')[swiper.activeIndex];
        set(this, 'currentOption', option);
        option.value ? swiper.unlockSwipeToNext() : swiper.lockSwipeToNext();
      },
    });

    this.set('swiper', swiper);
  },

  actions: {
    handleOptionInput(value) {
      const swiper = this.get('swiper');

      const option = this.get('options')[swiper.activeIndex];
      this.handleEvents.handleOptionInput(value, option, this.get('node'));

      later(this, function() {
        swiper.unlockSwipeToNext();
        swiper.slideNext();
        swiper.lockSwipeToNext();
      }, 750);
    }
  }
}).reopenClass({positionalParams: ['node','handleEvents']});
