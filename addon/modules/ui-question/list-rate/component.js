import Component from '@ember/component';
import layout from './template';
import noUiSlider from 'nouislider';

export default Component.extend({
  layout,
  tagName:'',

  didInsertElement() {
    this._super(...arguments);

    this.initSlider();
  },

  initSlider() {
    const rateOptions = this.get('node.rateOptions');
    const length = rateOptions.length;

    const options = {
      range: {
        min: rateOptions[0].value,
        max: rateOptions[length - 1].value
      },
      step: 1,
      tooltips: {
        to: (value) => {
          return rateOptions.findBy('value', Number.parseInt(value)).text;
        }
      },
      pips: {
        mode: 'steps',
        density: 100,
        filter() {return 1},
        format: {
          to(value) {
            return rateOptions.findBy('value', Number.parseInt(value)).text;
          }
        }
      }
    };

    this.options.forEach(option => {
      const slider = document.querySelector(`.slider-${option.renderId}`);
      const start = option.value || rateOptions[Math.floor(length / 2)].value;

      const ranger = noUiSlider.create(slider, {
        ...options,
        start: [start],
      });

      ranger.on('change', (values, index) => {
        const value = Number.parseInt(values[index]);
        this.handleEvents.handleOptionInput(value, option, this.node);
      });
    });
  }
}).reopenClass({positionalParams: ['node','handleEvents']});
