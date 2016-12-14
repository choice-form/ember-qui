/* eslint-disable */
import Route from 'ember-route';
import set from 'ember-metal/set';
import Ember from 'ember';
import faker from 'faker';

export default Route.extend({
  model() {
    return {
      nodes: [
        {
          title: faker.finance.accountName(),
          description: faker.lorem.paragraph(),
          images: [
            {
              ratio: 0.6666667,
              natural: '/images/sample-2.jpg',
              thumbnail: '/images/sample-2-thumbnail.jpg',
            }
          ],
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
          typeName: '选择题',
          minSelect: '1',
          maxSelect: '2',
          quesType: 'choice', //select, fill
          selectType: 'radio',
          showStyle: '',
          uuid: '001',
          isMust: true,
          number: '1',
          options: [
            Ember.Object.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
              icon: 'radio', // 选项的Icon
              inputType: 'select-input', // 'select', 'input', 'select-input,
              inputRule: 'timeRange', //输入控件初始化规则
              value: 'Here is options comment',
              placeholder: 'comment',
            }),
            Ember.Object.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
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
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
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
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: "443E6B4F-D705-483D-905F-07E420920E15",
              icon: 'radio',
              inputType: 'select-input',
              inputRule: 'time',
              value: 'input time',
              placeholder: '',
            })
          ],
        },
        {
          title: faker.finance.accountName(),
          description: faker.lorem.paragraph(),
          images: [
            {
              ratio: 0.6666667,
              natural: '/images/sample-2.jpg',
              thumbnail: '/images/sample-2-thumbnail.jpg',
            }
          ],
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
          typeName: '选择题',
          quesType: 'choice', //select, fill
          selectType: 'checkbox',
          showStyle: '',
          uuid: '002',
          isMust: false,
          number: '2',
          options: [
            Ember.Object.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: "po9CA073-8FD0-4C6F-8C07-02B063AC8C90",
              icon: 'checkbox', // 选项的Icon
              inputType: 'select-input', // 'select', 'input', 'select-input, ower-input',
              inputRule: 'design-16px_pen-01', //输入控件初始化规则
              value: 'Here is options comment',
              placeholder: 'comment',
            }),
            Ember.Object.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: "yb3E6B4F-D705-483D-905F-07E420920E19",
              icon: 'checkbox',
              inputType: '',
              inputRule: '',
              value: '',
              placeholder: 'placeholder',
            }),
            Ember.Object.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.paragraph(),
              uuid: "4ghE6B4F-D705-483D-905F-07E420920E18",
              icon: 'checkbox',
              inputType: 'select',
              inputRule: 'count',
              value: '选项',
              placeholder: 'input count',
            }),
            Ember.Object.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: "4msE6B4F-D705-483D-905F-07E420920E15",
              icon: 'checkbox',
              inputType: 'select-input',
              inputRule: 'time',
              value: 'input time',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: true,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.paragraph(),
              uuid: "4kjE6B4F-D705-483D-905F-07E420920E12",
              icon: 'checkbox',
              inputType: 'input',
              inputRule: 'int',
              value: '',
              placeholder: 'input int',
            }),
            Ember.Object.create({
              selected: true,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: '',
              uuid: "4iiE6B4F-D705-483D-919F-07E420920E12",
              icon: '',
              inputType: 'input',
              inputRule: 'float',
              value: '',
              placeholder: 'input float',
            }),
            Ember.Object.create({
              /**
               * @prop {bool} - 是否选中
               */
              selected: true,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: '',
              uuid: "4ggE6B4F-Duy5-483D-905F-07E420920E12",
              icon: '',
              inputType: 'input',
              inputRule: 'timeRange',
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

          return true;
        },

        handleOptionInput(data, option, question){
          console.log(data);
          console.log(option);
          console.log(question);

          return true;
        },

        handlePrevClick: () => {
          console.log('点击了上一题');
        },

        handleNextClick: () => {
          console.log('点击了下一题');
        }
      },

      nextButton: 'Next',

      logoText:'GMO',
    }
  }
});
