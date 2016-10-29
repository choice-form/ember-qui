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
        text: faker.address.streetAddress(true),
        description: '最少1分，最高5分',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'checkbox', // 选项的Icon
        value: '5',
        count: '5',
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: faker.address.streetAddress(true),
        description: '最少1分，最高5分',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
        icon: 'checkbox', // 选项的Icon
        value: '0',
        count: '6',
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: faker.address.streetAddress(true),
        description: '最少1分，最高5分',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C92",
        icon: 'checkbox', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '2',
        count: '4',
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: faker.address.streetAddress(true),
        description: '最少1分，最高5分',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
        icon: 'checkbox', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '1',
        count: '7',
        placeholder: '',
      })
    ];

    return {
      nodes:[
        {
          title:faker.address.streetAddress(true),
          description: faker.lorem.paragraph(),
          images:[1].map(function () {
            return faker.image.image(360, 360, true)
          }),
          typeName:'分值打分题',
          renderId: '4567890-0987',
          quesType: 'rating', //select, fill, valuemark
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
