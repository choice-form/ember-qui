import Route from 'ember-route';
import set from 'ember-metal/set';
import get from 'ember-metal/get';
import Ember from 'ember';
import faker from 'faker';


export default Route.extend({
  model() {

    let options = [
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: '最低10分,最高100分',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'svg-folder', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '5',
        count: '7',
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: '最低30分,最高100分',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
        icon: 'svg-folder', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '0',
        count: '7',
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: '最低30分,最高80分',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C92",
        icon: 'svg-folder', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '2',
        count: '7',
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: '最低30分,最高100分',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
        icon: 'svg-folder', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '7',
        count: '7',
        placeholder: '',
      })
    ];

    return {
      control:[
        {
          title:faker.address.streetAddress(true),
          description: faker.lorem.paragraph(),
          images:[1].map(function () {
            return faker.image.image(360, 360, true)
          }),
          typeName:'分值打分题',
          renderId: '4567890-0987',
          nodeType: 'rating', //select, fill, valuemark
          selectType: '',
          showStyle: '',
          uuid: '002',

          options,
        }
      ],

      handleEvents: {
        handleOptionClick: (option, control) => {
          console.log(option);
          console.log(control);
          if (option.toggleProperty('selected')) {

            options.forEach((opt) => {
              if (opt != option) {
                set(opt, 'selected', false);
              }
            })
          }
        },

        handleOptionInput: (option, control) => {
          console.log(option);
          console.log(control);
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
