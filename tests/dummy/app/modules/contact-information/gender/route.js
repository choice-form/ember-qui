/* eslint-disable */
import Route from 'ember-route';
import set from 'ember-metal/set';
import get from 'ember-metal/get';
import Ember from 'ember';
import faker from 'faker';

export default Route.extend({
  model() {
    let options = [
      Ember.Object.create({
        selected: false,
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        text: faker.lorem.words(),
        uuid: faker.date.between('2016-01-01', '2016-12-31'),
        icon: 'alert-circle-?',
      }),
      Ember.Object.create({
        selected: false,
        renderId: '4567890-871',
        text: faker.lorem.words(),
        uuid: faker.date.between('2016-01-01', '2016-12-31'),
        icon: 'users',
      }),
    ];

    return {

      nodes: [
        {
          title: faker.lorem.words(),
          description: faker.lorem.paragraph(),
          images: '',
          renderId: '12213343234',
          typeName: '性别题',
          quesType: 'gender',
          selectType: 'radio',
          showStyle: '',
          uuid: '001',
          isMust: true,
          number: '1',
          options,
        }
      ],

      handleEvents: {
        handleOptionClick: (option, node) => {
          console.log(option);
          console.log(node);
          if (option.toggleProperty('selected')) {
            options.forEach((opt) => {
              if (opt != option) {
                set(opt, 'selected', false);
              }
            })
          }
        },
      },

      prevButton: 'Previous',

      nextButton: 'Next',
    }
  }
});
