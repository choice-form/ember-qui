import Route from 'ember-route';
import set from 'ember-metal/set';
import Ember from 'ember';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {
    return {

      intro: {
        title: faker.lorem.sentence(),
        description: faker.lorem.sentences(),
        images: [1, 2].map(function () {
          return faker.image.fashion(640, 360, true)
        }),

        handleEvents: {
          handleNextClick: () => {
            console.log('点击了下一题');
          }
        },

        nextButton: "Start",
      },

      control: [
        {
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          images: '',
          renderId: '12213343234',
          typeName: '选择题',
          nodeType: 'choice', //select, fill
          selectType: 'radio',
          showStyle: '',
          uuid: '001',
          isMust: true,
          number: '1',
          options: [
            Ember.Object.create({
              selected: false,
              renderId: '4567890-0987',
              text: faker.lorem.sentence(),
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
              text: faker.lorem.sentence(),
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
              text: faker.lorem.sentence(),
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
              text: faker.lorem.sentence(),
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
              uuid: "443E6B4F-D705-483D-919F-07E420920E12",
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
              uuid: "443E6B4F-Duy5-483D-905F-07E420920E12",
              icon: 'radio',
              inputType: 'input',
              inputRule: 'calendar',
              value: '',
              placeholder: 'input calendar',
            })
          ],
        },
        {
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          images: [1].map(function () {
            return faker.image.fashion(640, 360, true)
          }),
          typeName: '分值打分题',
          renderId: '4567890-0987',
          nodeType: 'rating', //select, fill, valuemark
          selectType: '',
          showStyle: '',
          uuid: '002',
          isMust: true,
          number: '4',
          options: [
            Ember.Object.create({
              selected: '',
              renderId: '4567890-0987',
              text: '最低10分,最高100分',
              uuid: "2plCA073-8FD0-4C6F-8C07-02B063AC8C90",
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
              uuid: "299CA073-8yh0-4C6F-8C07-02B063AC8C91",
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
              uuid: "299Cui73-8FD0-4C6F-8C07-02B063AC8C92",
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
              uuid: "299CA073-8Fnh-4C6F-8C07-02B063AC8C91",
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

            control.options.forEach((opt) => {
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

      prevButton: 'Previous',

      nextButton: 'Next',
    }
  }
});
