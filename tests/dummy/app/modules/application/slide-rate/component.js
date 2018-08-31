import Component from '@ember/component';

export default class extends Component {
  constructor() {
    super(...arguments);

    this.node = {
      isHackSlide: false,
      renderId: '8bb8a359-b975-4af4-84d5-7a987df8c8de',
      rateOptions: [
        { text: 'Rate 1', value: 1 },
        { text: 'Rate 2', value: 2 },
        { text: 'Rate 3', value: 3 },
        { text: 'Rate 4', value: 4 },
        { text: 'Rate 5', value: 5 },
      ],
    };

    this.handleEvents = {
      handleOptionInput() {},
    };

    this.options = [{ value: '' }, { value: '' }, { value: '' }];
  }
}
