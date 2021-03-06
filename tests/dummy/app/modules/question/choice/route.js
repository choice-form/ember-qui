/* eslint-disable */
import EmberObject from '@ember/object';
import Route from '@ember/routing/route';
import { set } from '@ember/object';
import faker from 'faker';

export default Route.extend({
  model() {
    return {
      nodes: [
        {
          title: `选择题标题##/images/sample-1.jpg?w=20&h=30##${faker.finance.accountName()}`,
          description: `选择题描述##/images/sample-2.jpg?w=20&h=30##${faker.lorem.paragraph()}`,
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
          asterisks: true,
          number: '',
          errorMessage:'第一题错误',
          options: [
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: `选项##/images/sample-3.jpg?w=20&h=30##${faker.lorem.sentence()}`,
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
              icon: 'radio', // 选项的Icon
              inputType: 'select-input', // 'select', 'input', 'select-input,
              inputRule: 'timeRange', //输入控件初始化规则
              value: 'Here is options comment',
              placeholder: 'comment',
            }),
            EmberObject.create({
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
            EmberObject.create({
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
            EmberObject.create({
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
          asterisks: true,
          number: '2',
          options: [
            EmberObject.create({
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
            EmberObject.create({
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
            EmberObject.create({
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
            EmberObject.create({
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
            EmberObject.create({
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
            EmberObject.create({
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
            EmberObject.create({
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
              placeholder: 'timeRange',
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
          data ? set(option, 'errorMessage', '你的输入有误，请重新输入')
            : set(option, 'errorMessage', '');
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

      hideFooter: false,
    };
  }
});
