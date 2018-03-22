import Component from 'ember-component';
import layout from './template';
import inject from 'ember-service/inject';
import computed, { alias } from 'ember-computed';
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

  allowSwipeToPrev: false,

  allowSwipeToNext: false,

  isEnd: false,

  didInsertElement() {
    this._super(...arguments);

    this.get('rateOptions').forEach(rateOption => {
      this.get('iconService').getIconByUrl(rateOption.url, rateOption.url)
        .then(icon => set(rateOption, 'svg', icon.outerHTML));
    });

    const swiper = new Swiper('.swiper-container', {
      allowSwipeToPrev: false,
      allowSwipeToNext: false,
      autoHeight: true,
      pagination: '.swiper-pagination',
      paginationType: 'fraction',
      onSlideChangeEnd: swiper => {
        const option = this.get('options')[swiper.activeIndex];
        this.setProperties({
          currentOption: option,
          allowSwipeToPrev: swiper.activeIndex != 0,
          allowSwipeToNext: !!option.value && swiper.activeIndex != this.get('options.length') - 1,
          isEnd: swiper.activeIndex == this.get('options.length') - 1,
        });
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
      }, 850);
    },

    swipeToPrev() {
      const swiper = this.get('swiper');
      swiper.unlockSwipeToPrev();
      swiper.slidePrev();
      swiper.lockSwipeToPrev();
    },

    swipeToNext() {
      const swiper = this.get('swiper');
      swiper.unlockSwipeToNext();
      swiper.slideNext();
      swiper.lockSwipeToNext();
    }
  }
}).reopenClass({positionalParams: ['node','handleEvents']});
