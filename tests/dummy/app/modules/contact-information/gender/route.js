/* eslint-disable */
import EmberObject from '@ember/object';
import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { get } from '@ember/object';
import faker from 'faker';

export default Route.extend({
  model() {
    let options = [
      EmberObject.create({
        selected: false,
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        text: faker.lorem.words(),
        uuid: faker.date.between('2016-01-01', '2016-12-31'),
        icon: 'men',
      }),
      EmberObject.create({
        selected: false,
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        text: faker.lorem.words(),
        uuid: faker.date.between('2016-01-01', '2016-12-31'),
        icon: 'women',
      }),
      EmberObject.create({
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        text: faker.lorem.words(),
        uuid: faker.date.between('2016-01-01', '2016-12-31'),
        icon: '',
        inputType: 'input',
        inputRule: 'float',
        value: '',
        placeholder: 'input float',
      }),
      EmberObject.create({
        selected: false,
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        text: faker.lorem.sentence(),
        uuid: "4msE6B4F-D705-483D-905F-07E420920E15",
        icon: 'radio',
        inputType: 'select-input',
        inputRule: 'time',
        value: 'input time',
        placeholder: '',
      }),
      EmberObject.create({
        selected: false,
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        text: faker.lorem.sentence(),
        uuid: "4msE6B4F-D705-483D-905F-07E420920E15",
        icon: 'radio',
        inputType: 'select-input',
        inputRule: 'time',
        value: 'input time',
        placeholder: '',
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

          return true;
        },
      },

      prevButton: 'Previous',

      nextButton: 'Next',
    }
  }
});
