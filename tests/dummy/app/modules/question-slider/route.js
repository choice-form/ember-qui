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
        text: faker.lorem.words(),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: '', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: 0,
        minValue:3,
        maxValue:10,
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: faker.lorem.words(),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
        icon: '', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: 5,
        minValue:3,
        maxValue:10,
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: faker.lorem.words(),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C92",
        icon: '', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: 4,
        minValue:2,
        maxValue:10,
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: faker.lorem.words(),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C93",
        icon: '', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: 6,
        minValue:1,
        maxValue:8,
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: faker.lorem.words(),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C94",
        icon: '', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: 9,
        minValue:1,
        maxValue:9,
        placeholder: '',
      }),
    ];

    return {

      nodes:[
        {
          title: faker.lorem.words(),
          description: faker.lorem.paragraph(),
          images: '',
          typeName:'分值打分题',
          renderId: '4567890-0987',
          quesType: 'slider', //select, fill, slider
          selectType: '',
          showStyle: '',
          uuid: '002',
          isMust:true,
          number:'7',
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
