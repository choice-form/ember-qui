import Route from 'ember-route';
import set from 'ember-metal/set';
import Ember from 'ember';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {

    let options = [
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: faker.lorem.sentence(),
        description: 'Rating Labels',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'star', // 选项的Icon
        emoji: ['☹️', '😍'],
        value: '5',
        count: '5',
        marks: [1, 2, 3, 4, 5].map(function () {
          return faker.random.number();
        }),
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: faker.lorem.sentence(),
        description: 'Rating Labels',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
        icon: 'thumbs-up', // 选项的Icon
        value: '0',
        count: '6',
        marks: [1, 2, 3, 4, 5, 6].map(function () {
          return faker.random.number();
        }),
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: faker.lorem.sentence(),
        description: 'Rating Labels',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C92",
        icon: 'baloon', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '2',
        count: '4',
        marks: [1, 2, 3, 4].map(function () {
          return faker.random.number();
        }),
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: faker.lorem.sentence(),
        description: 'Rating Labels',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
        icon: 'love-favorite', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '1',
        count: '7',
        marks: [1, 2, 3, 4, 5, 6, 7].map(function () {
          return faker.random.number();
        }),
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: faker.lorem.sentence(),
        description: 'Rating Labels',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
        icon: 'crown', // 选项的Icon
        inputType: 'input', // 'select', 'input', 'select-input',
        inputRule: 'timeRange', //输入控件初始化规则
        value: '1',
        count: '3',
        marks: [1, 2, 3].map(function () {
          return faker.random.number();
        }),
        placeholder: '',
      })
    ];

    return {
      nodes: [
        {
          title: faker.finance.accountName(),
          description: faker.lorem.paragraph(),
          images: '',
          typeName: '分值打分题',
          renderId: '4567890-0987',
          quesType: 'rating',
          selectType: '',
          showStyle: '',
          uuid: '002',
          isMust: true,
          number: '4',

          options,
        }
      ],

      handleEvents: {
        handleOptionClick(data, option, question){
          console.log(data);
          console.log(option);
          console.log(question);
          set(option, 'value', data);
          return true;
        },

        handleOptionInput(data, option, question){
          console.log(data);
          console.log(option);
          console.log(question);

          return true;
        },

      },

      prevButton: 'Previous',

      nextButton: 'Next',
    }
  }
});
