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
        emoji: ['a1', 'b1'],
        icon: 'radio', // 选项的Icon
        value: '5',
        count: '5',
        marks:[1,2,3,4,5].map(function () {
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
        emoji: ['a2', 'b2'],
        icon: 'love-favorite', // 选项的Icon
        value: '0',
        count: '6',
        marks:[1,2,3,4,5,6].map(function () {
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
        emoji: ['a3', 'b3'],
        icon: 'love-favorite', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '2',
        count: '4',
        marks:[1,2,3,4].map(function () {
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
        emoji: ['a4', 'b4'],
        icon: 'love-favorite', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '1',
        count: '7',
        marks:[1,2,3,4,5,6,7].map(function () {
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
        emoji: ['a5', 'b5'],
        icon: 'love-favorite', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '1',
        count: '3',
        marks:[1,2,3].map(function () {
          return faker.random.number();
        }),
        placeholder: '',
      })
    ];

    return {
      nodes:[
        {
          title: faker.lorem.words(),
          description: faker.lorem.paragraph(),
          images: [
            {
              natural:'/images/sample-1.jpg',
              thumbnail:'/images/sample-1-thumbnail.jpg',
            },
            {
              natural:'/images/sample-2.jpg',
              thumbnail:'/images/sample-2-thumbnail.jpg',
            },
            {
              natural:'/images/sample-3.jpg',
              thumbnail:'/images/sample-3-thumbnail.jpg',
            }
          ],
          typeName:'分值打分题',
          renderId: '4567890-0987',
          quesType: 'rating',
          selectType: '',
          showStyle: '',
          uuid: '002',
          isMust:true,
          number:'4',
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

        handleOptionInput: (option, node) => {
          console.log(option);
          console.log(node);
        },

        handlePrevClick: () => {
          console.log('点击了上一题');
        },

        handleNextClick: () => {
          console.log('点击了下一题');
        }
      },

      prevButton: '上一题',

      nextButton: '下一题',
    }
  }
});
