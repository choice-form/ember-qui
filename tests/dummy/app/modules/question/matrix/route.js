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
          renderId: '4567yy0-0987',
          quesType: 'matrix',
          uuid: '005',
          optionsX:[
            {
              text: `COLUMN1 ${faker.finance.accountName()}`,
            },
            {
              text: `COLUMN2 ${faker.finance.accountName()}`,
            },
            {
              text: `COLUMN3 ${faker.finance.accountName()}`,
            },
            {
              text: `COLUMN4 ${faker.finance.accountName()}`,
            },
            {
              text: `COLUMN5 ${faker.finance.accountName()}`,
            },
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
              {
                selected: false,
                renderId: Math.random(1000),
                subMatrix: [
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
              },
              {
                selected: false,
                renderId: Math.random(1000),
                subMatrix: [
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
              },
              {
                selected: false,
                renderId: Math.random(1000),
                subMatrix: [
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
              },
              {
                selected: false,
                renderId: Math.random(1000),
                subMatrix: [
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
              },
              {
                selected: false,
                renderId: Math.random(1000),
                subMatrix: [
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
              }
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


        handleOptionClick: (option, matrixItem, node) => {
          console.log(option);
          console.log(matrixItem);
          set(option, 'selected', !get(option, 'selected'));
          let subMatrixIsSelected= false;
          matrixItem.subMatrix.forEach((item)=>{
            if(item.selected){
              subMatrixIsSelected = true;
              return ;
            }
          })
          set(matrixItem, 'selected', subMatrixIsSelected);

        },
      },

      prevButton: 'Previous',

      nextButton: 'Next',
    }
  }
});
