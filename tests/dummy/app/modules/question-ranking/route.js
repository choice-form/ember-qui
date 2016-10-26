import Route from 'ember-route';
import set from 'ember-metal/set';
import get from 'ember-metal/get';
import Ember from 'ember';
import faker from 'faker';


export default Route.extend({
  model() {
    let options = [
      Ember.Object.create({
        text: faker.address.streetAddress(true),
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'svg-folder', // 选项的Icon
        sort: 1,
        inputType: '', // 'select', 'input', 'select-input, ower-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        placeholder: '',
      }),
      Ember.Object.create({
        text: faker.address.streetAddress(true),
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'svg-folder', // 选项的Icon
        sort: 2,
        inputType: '', // 'select', 'input', 'select-input, ower-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        placeholder: '',
      }),
      Ember.Object.create({
        text: faker.address.streetAddress(true),
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'svg-folder', // 选项的Icon
        sort: 3,
        inputType: '', // 'select', 'input', 'select-input, ower-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        placeholder: '',
      }),
      Ember.Object.create({
        text: faker.address.streetAddress(true),
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'svg-folder', // 选项的Icon
        sort: 4,
        inputType: '', // 'select', 'input', 'select-input, ower-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        placeholder: '',
      }),
      Ember.Object.create({
        text: faker.address.streetAddress(true),
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'svg-folder', // 选项的Icon
        sort: 5,
        inputType: '', // 'select', 'input', 'select-input, ower-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        placeholder: '',
      }),
      Ember.Object.create({
        text: faker.address.streetAddress(true),
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'svg-folder', // 选项的Icon
        sort: 6,
        inputType: '', // 'select', 'input', 'select-input, ower-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        placeholder: '',
      }),
      Ember.Object.create({
        text: faker.address.streetAddress(true),
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'svg-folder', // 选项的Icon
        sort: 7,
        inputType: '', // 'select', 'input', 'select-input, ower-input',
        inputRule: '', //输入控件初始化规则
        value: '',
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
          typeName:'排序题',
          renderId: '4567890-0987',
          nodeType: 'ranking',
          selectType: '',
          showStyle: '',
          uuid: '005',

          options,
        },
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
