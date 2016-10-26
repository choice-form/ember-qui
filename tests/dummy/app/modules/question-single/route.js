import Route from 'ember-route';
import set from 'ember-metal/set';
import Ember from 'ember';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {
    let options = [
      Ember.Object.create({
        selected: false,
        renderId: '4567890-0987',
        text: faker.address.streetAddress(true),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'radio', // 选项的Icon
        inputType: 'select-input', // 'select', 'input', 'select-input, ower-input',
        inputRule: 'design-16px_pen-01', //输入控件初始化规则
        value: '这里是自身选项备注',
        placeholder: '输入备注',
      }),
      Ember.Object.create({
        selected: false,
        renderId: '4567890-871',
        text: faker.address.streetAddress(true),
        uuid: "443E6B4F-D705-483D-905F-07E420920E19",
        icon: 'radio',
        inputType: '',
        inputRule: '',
        value: '',
        placeholder: 'placeholder',
      }),
      Ember.Object.create({
        selected: false,
        renderId: '4567890-0981',
        text: `选项 ${faker.lorem.paragraph()}`,
        uuid: "443E6B4F-D705-483D-905F-07E420920E18",
        icon: 'radio',
        inputType: 'select',
        inputRule: 'count',
        value: '选项',
        placeholder: 'input count',
      }),
      Ember.Object.create({
        selected: false,
        renderId: '4567890-0985',
        text: faker.address.streetAddress(true),
        uuid: "443E6B4F-D705-483D-905F-07E420920E15",
        icon: 'radio',
        inputType: 'select-input',
        inputRule: 'time',
        value: 'input time',
        placeholder: '',
      }),
      Ember.Object.create({
        selected: true,
        renderId: '4567890-0988',
        text: faker.lorem.paragraph(),
        uuid: "443E6B4F-D705-483D-905F-07E420920E12",
        icon: 'radio',
        inputType: 'input',
        inputRule: 'int',
        value: '',
        placeholder: 'input int',
      }),
      Ember.Object.create({
        selected: true,
        renderId: '4567890-0912',
        text: faker.lorem.paragraph(),
        uuid: "443E6B4F-D705-483D-905F-07E420920E12",
        icon: 'radio',
        inputType: 'input',
        inputRule: 'float',
        value: '',
        placeholder: 'input float',
      }),
      Ember.Object.create({
        selected: true,
        renderId: '4567890-0912',
        text: faker.lorem.paragraph(),
        uuid: "443E6B4F-D705-483D-905F-07E420920E12",
        icon: 'radio',
        inputType: 'input',
        inputRule: 'calendar',
        value: '',
        placeholder: 'input calendar',
      })
    ];


    return {

      intro:{
        title:faker.address.streetAddress(true),
        description: faker.lorem.paragraph(),
        images:[1,2].map(function () {
          return faker.image.image(360, 360, true)
        }),

        handleEvents: {
          handleNextClick: () => {
            console.log('点击了下一题');
          }
        },

        nextButton: "下一题",
      },

      control: [
        {
          title: faker.address.streetAddress(true),
          description: faker.lorem.paragraph(),
          images: [1].map(function () {
            return faker.image.image(640, 360, true)
          }),
          renderId:'12213343234',
          typeName: '选择题',
          nodeType: 'choice', //select, fill
          selectType: 'radio',
          showStyle: '',
          uuid: '001',
          isMust:true,
          number:'1',
          options,
        },
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
          isMust:true,
          number:'4',
          options:[
            Ember.Object.create({
              selected: '',
              renderId: '4567890-0987',
              text: '最低10分,最高100分',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
              icon: 'checkbox', // 选项的Icon
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
              icon: 'checkbox', // 选项的Icon
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
              icon: 'checkbox', // 选项的Icon
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
              icon: 'checkbox', // 选项的Icon
              inputType: '', // 'select', 'input', 'select-input',
              inputRule: '', //输入控件初始化规则
              value: '7',
              count: '7',
              placeholder: '',
            })
          ],
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
