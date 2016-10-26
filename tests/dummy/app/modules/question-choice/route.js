import Route from 'ember-route';
import set from 'ember-metal/set';
import get from 'ember-metal/get';
import Ember from 'ember';
import faker from 'faker';


export default Route.extend({
  model() {
    let options = [
      Ember.Object.create({
        selected: false,
        text: faker.address.streetAddress(true),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'svg-folder', // 选项的Icon
        inputType: 'ower-input', // 'select', 'input', 'select-input, ower-input',
        inputRule: 'design-16px_pen-01', //输入控件初始化规则
        value: '这里是自身选项备注',
        placeholder: '输入备注',
      }),
      Ember.Object.create({
        selected: false,
        text: faker.address.streetAddress(true),
        uuid: "443E6B4F-D705-483D-905F-07E420920E19",
        icon: 'svg-folder',
        inputType: '',
        inputRule: '',
        value: '',
        placeholder: 'placeholder',
      }),
      Ember.Object.create({
        selected: false,
        text: `选项 ${faker.lorem.paragraph()}`,
        uuid: "443E6B4F-D705-483D-905F-07E420920E18",
        icon: 'svg-folder',
        inputType: 'select',
        inputRule: 'count',
        value: '选项',
        placeholder: 'input count',
      }),
      Ember.Object.create({
        selected: false,
        text: faker.address.streetAddress(true),
        uuid: "443E6B4F-D705-483D-905F-07E420920E15",
        icon: 'svg-folder',
        inputType: 'select-input',
        inputRule: 'time',
        value: 'input time',
        placeholder: '',
      }),
      Ember.Object.create({
        selected: true,
        text: faker.lorem.paragraph(),
        uuid: "443E6B4F-D705-483D-905F-07E420920E12",
        icon: 'svg-folder',
        inputType: 'input',
        inputRule: 'int',
        value: '',
        placeholder: 'input int',
      }),
      Ember.Object.create({
        selected: true,
        text: faker.lorem.paragraph(),
        uuid: "443E6B4F-D705-483D-905F-07E420920E12",
        icon: 'svg-folder',
        inputType: 'input',
        inputRule: 'float',
        value: '',
        placeholder: 'input float',
      }),
      Ember.Object.create({
        selected: true,
        text: faker.lorem.paragraph(),
        uuid: "443E6B4F-D705-483D-905F-07E420920E12",
        icon: 'svg-folder',
        inputType: 'input',
        inputRule: 'calendar',
        value: '',
        placeholder: 'input calendar',
      })
    ];

    return {


      control: [
        {
          title: faker.address.streetAddress(true),
          description: faker.lorem.paragraph(),
          images: [1].map(function () {
            return faker.image.image(360, 360, true)
          }),
          typeName: '选择题',

          type: 'choice', //select, fill
          selectType: 'checkbox',
          showStyle: '',
          id: '001',

          options,
        }
      ],

      handleEvents:{
        handleClick: (option) => {
          console.log(option);
          if (option.toggleProperty('selected')) {

            options.forEach((opt) => {
              if (opt != option) {
                set(opt, 'selected', false);
              }
            })
          }
        },

        handlePrev: () => {
          console.log('点击了上一题');
        },

        handleNext: () => {
          console.log('点击了下一题');
        }
      },

      prevButton: '上一题',

      nextButton: '下一题',
    }
  }
});
