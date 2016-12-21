/* eslint-disable */
import Route from 'ember-route';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import faker from 'faker';

export default Route.extend({
  model() {
    return {
      nodes: [
        {
          title: faker.finance.accountName(),
          description: faker.lorem.paragraph(),
          images: '',
          typeName: '排序题',
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
          quesType: 'matrix',
          uuid: '005',
          isMust: true,
          number: '7',
          renderOptionsX:[
            {
              text: `COLUMN1 ${faker.finance.accountName()}COLUMN1 ${faker.finance.accountName()}COLUMN1 ${faker.finance.accountName()}`,
            },
            {
              text: `COLUMN2 ${faker.finance.accountName()} COLUMN1 ${faker.finance.accountName()}COLUMN1 ${faker.finance.accountName()}COLUMN1 ${faker.finance.accountName()}COLUMN1 ${faker.finance.accountName()}`,
            },
            {
              text: `COLUMN3 ${faker.finance.accountName()}`,
            }
          ],
          renderOptionsY:[
            {
              text: `ROW1 ${faker.lorem.sentence()}ROW1 ${faker.lorem.sentence()}ROW1 ${faker.lorem.sentence()}`,
            },
            {
              text: `ROW2 ${faker.lorem.sentence()}`,
            },
            {
              text: `ROW3 ${faker.lorem.sentence()}ROW1 ${faker.lorem.sentence()}ROW1 ${faker.lorem.sentence()}`,
            },
            {
              text: `ROW4 ${faker.lorem.sentence()}`,
            }
          ],
          matrix:[
            [
              {
                selected:false,
                renderId:Math.random(1000),
              },
              {
                selected:false,
                renderId:Math.random(1000),
              },
              {
                selected:false,
                renderId:Math.random(1000),
              },
              {
                selected:false,
                renderId:Math.random(1000),
              },
            ],
            [
              {
                selected:false,
                renderId:Math.random(1000),
              },
              {
                selected:false,
                renderId:Math.random(1000),
              },
              {
                selected:false,
                renderId:Math.random(1000),
              },
              {
                selected:false,
                renderId:Math.random(1000),
              },
            ],
            [
              {
                selected:false,
                renderId:Math.random(1000),
              },
              {
                selected:false,
                renderId:Math.random(1000),
              },
              {
                selected:false,
                renderId:Math.random(1000),
              },
              {
                selected:false,
                renderId:Math.random(1000),
              },
            ]
          ],
          otherOptions:[
            {
              selected:false,
              inputType: 'input', // 'select', 'input', 'select-input, ower-input',
              inputRule: 'date', //输入控件初始化规则
            },
            {
              selected:false,
              inputType: 'input', // 'select', 'input', 'select-input, ower-input',
              inputRule: 'dateRange', //输入控件初始化规则
            },
            {
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.paragraph(),
              uuid: "4ghE6B4F-D705-483D-905F-07E420920E18",
              icon: 'checkbox',
              inputType: 'select',
              inputRule: 'count',
              value: '选项',
              placeholder: 'input count',
            },
            {
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: "4msE6B4F-D705-483D-905F-07E420920E15",
              icon: 'checkbox',
              inputType: 'select-input',
              inputRule: 'time',
              value: 'input time',
              placeholder: '',
            },
            {
              selected: true,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.paragraph(),
              uuid: "4kjE6B4F-D705-483D-905F-07E420920E12",
              icon: 'checkbox',
              inputType: 'input',
              inputRule: 'int',
              value: '',
              placeholder: 'input int',
            },
          ]
        },
      ],

      handleEvents: {

        handleOptionInput(data, option, question){
          console.log(data);
          console.log(option);
          console.log(question);
          return true;
        },

        handleOptionClick: (option, node) => {
          console.log(option);
          console.log(node);
          set(option, 'selected', !get(option, 'selected'));
          return true;
        },
      },

      prevButton: 'Previous',

      nextButton: 'Next',
    }
  }
});
