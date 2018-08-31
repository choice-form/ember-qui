import Component from '@ember/component';
import layout from './template';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { set } from '@ember/object';
import { later, throttle } from '@ember/runloop';
import Swiper from 'swiper';
import noUiSlider from 'nouislider';

export default Component.extend({
  layout,
  tagName: '',
  iconService: inject('icon-loader'),

  rateOptions: computed('options.@each.value', function() {
    const result = this.options.reduce((acc, option) => {
      acc[option.value]
        ? acc[option.value].push(option)
        : (acc[option.value] = [option]);
      return acc;
    }, {});

    return this.node.rateOptions.map(rateOption => {
      set(rateOption, 'result', result[rateOption.value] || []);
      return rateOption;
    });
  }),

  currentOption: computed(function() {
    return this.options[0];
  }),

  allowSlidePrev: false,

  allowSlideNext: computed(function() {
    return !!this.options[0].value;
  }),

  didInsertElement() {
    this._super(...arguments);

    this.initSwiper();

    if (this.node.isHackSlide) {
      this.initSlider();
    } else {
      this.rateOptions.forEach(rateOption => {
        this.iconService
          .getIconByUrl(rateOption.url, rateOption.url)
          .then(icon => set(rateOption, 'svg', icon.outerHTML));
      });
    }
  },

  initSwiper() {
    const selector = `[data-render-id='${this.get(
      'node.renderId'
    )}'].swiper-container`;

    const swiper = new Swiper(selector, {
      allowSlidePrev: false,
      allowSlideNext: false,
      autoHeight: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
    });

    swiper.on('slideChange', () => {
      const option = this.options[swiper.activeIndex];
      this.setProperties({
        currentOption: option,
        allowSlidePrev: swiper.activeIndex != 0,
        allowSlideNext:
          !!option.value && swiper.activeIndex != this.options.length - 1,
      });
    });

    this.set('swiper', swiper);
  },

  initSlider() {
    const rateOptions = this.node.rateOptions;
    const length = rateOptions.length;

    const options = {
      range: {
        min: rateOptions[0].value,
        max: rateOptions[length - 1].value,
      },
      step: 1,
      tooltips: {
        to: value => {
          return rateOptions.findBy('value', Number.parseInt(value)).text;
        },
      },
      pips: {
        mode: 'steps',
        density: 100,
        filter() {
          return 1;
        },
        format: {
          to(value) {
            return rateOptions.findBy('value', Number.parseInt(value)).text;
          },
        },
      },
    };

    const slider = document.querySelector(`.slider-${this.node.renderId}`);
    const start =
      this.options[0].value || rateOptions[Math.floor(length / 2)].value;

    const ranger = noUiSlider.create(slider, {
      ...options,
      start: [start],
    });

    ranger.on('change', (values, index) => {
      this.set('value', Number.parseInt(values[index]));
      throttle(this, this.throttleHandleOptionInput, 850);
    });

    this.set('ranger', ranger);
  },

  updateRangerValue() {
    const rateOptions = this.node.rateOptions;
    const length = rateOptions.length;

    const value =
      this.currentOption.value || rateOptions[Math.floor(length / 2)].value;
    this.ranger.updateOptions({ start: [value] });
  },

  throttleHandleOptionInput() {
    const swiper = this.swiper;

    const option = this.options[swiper.activeIndex];
    this.handleEvents.handleOptionInput(this.value, option, this.node);

    later(
      this,
      function() {
        swiper.allowSlideNext = true;
        swiper.update();
        swiper.slideNext();
        swiper.allowSlideNext = false;
        swiper.update();

        if (this.node.isHackSlide) {
          this.updateRangerValue();
        }
      },
      850
    );
  },

  actions: {
    handleOptionInput(value) {
      this.set('value', value);
      throttle(this, this.throttleHandleOptionInput, 850);
    },

    swipeToPrev() {
      const swiper = this.swiper;
      swiper.allowSlidePrev = true;
      swiper.update();
      swiper.slidePrev();
      swiper.allowSlidePrev = false;
      swiper.update();

      if (this.node.isHackSlide) {
        this.updateRangerValue();
      }
    },

    swipeToNext() {
      const swiper = this.swiper;
      swiper.allowSlideNext = true;
      swiper.update();
      swiper.slideNext();
      swiper.allowSlideNext = false;
      swiper.update();

      if (this.node.isHackSlide) {
        this.updateRangerValue();
      }
    },
  },
}).reopenClass({ positionalParams: ['node', 'handleEvents'] });
