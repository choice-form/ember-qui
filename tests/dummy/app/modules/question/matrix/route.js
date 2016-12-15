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
          optionsX:[
            {
              text: `COLUMN1 ${faker.finance.accountName()}`,
            },
            {
              text: `COLUMN2 ${faker.finance.accountName()}`,
            },
            {
              text: `COLUMN3 ${faker.finance.accountName()}`,
            }
          ],
          optionsY:[
            {
              text: `ROW1 ${faker.lorem.sentence()}`,
            },
            {
              text: `ROW2 ${faker.lorem.sentence()}`,
            },
            {
              text: `ROW3 ${faker.lorem.sentence()}`,
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
            }
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
