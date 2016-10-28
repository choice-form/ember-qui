import Route from 'ember-route';
import set from 'ember-metal/set';
import Ember from 'ember';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {
    return {
      nodes: [
        {
          title: faker.address.streetAddress(true),
          description: faker.lorem.paragraph(),
          images: [1].map(function () {
            return faker.image.image(640, 360, true)
          }),
          renderId:'12213343234',
          typeName: '选择题',
          quesType: 'choice', //select, fill
          selectType: 'radio',
          showStyle: '',
          uuid: '001',
          isMust:true,
          number:'1',
          options:[
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
          title: faker.address.streetAddress(true),
          description: faker.lorem.paragraph(),
          images: [1].map(function () {
            return faker.image.image(640, 360, true)
          }),
          renderId:'775519',
          typeName: '选择题',
          quesType: 'choice', //select, fill
          selectType: 'checkbox',
          showStyle: '',
          uuid: '002',
          isMust:false,
          number:'2',
          options:[
            Ember.Object.create({
              selected: false,
              renderId: '4567890-0987',
              text: faker.address.streetAddress(true),
              uuid: "po9CA073-8FD0-4C6F-8C07-02B063AC8C90",
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
              uuid: "yb3E6B4F-D705-483D-905F-07E420920E19",
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
              uuid: "4ghE6B4F-D705-483D-905F-07E420920E18",
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
              uuid: "4msE6B4F-D705-483D-905F-07E420920E15",
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
              uuid: "4kjE6B4F-D705-483D-905F-07E420920E12",
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
              uuid: "4iiE6B4F-D705-483D-919F-07E420920E12",
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
              uuid: "4ggE6B4F-Duy5-483D-905F-07E420920E12",
              icon: 'radio',
              inputType: 'input',
              inputRule: 'calendar',
              value: '',
              placeholder: 'input calendar',
            })
          ],
        }
      ],

      handleEvents: {
        handleOptionClick: (option, node) => {
          console.log(option);
          console.log(node);
          if (option.toggleProperty('selected')) {

            node.options.forEach((opt) => {
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
