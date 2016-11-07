/* eslint-disable */
import Route from 'ember-route';
import get from 'ember-metal/get';
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
              ratio: 0.667,
              natural: '/images/sample-1.jpg',
              thumbnail: '/images/sample-1-thumbnail.jpg',
            }
          ],
          typeName: '排序题',
          renderId: '4567yy0-0987',
          quesType: 'matrix',
          uuid: '005',
          optionsX:[
            {
              text: `列1${faker.name.findName()}`,
            },
            {
              text: `列2${faker.name.findName()}`,
            },
            {
              text: `列3${faker.name.findName()}`,
            },
            {
              text: `列4${faker.name.findName()}`,
            },
            {
              text: `列5${faker.name.findName()}`,
            },
          ],
          optionsY:[
            {
              text: `行1${faker.address.country()}`,
            },
            {
              text: `行2${faker.address.country()}`,
            },
            {
              text: `行3${faker.address.country()}`,
            },
            {
              text: `行4${faker.address.country()}`,
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
            ],
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
          /*if (option.toggleProperty('selected')) {

            node.options.forEach((opt) => {
              if (opt != option) {
                set(opt, 'selected', false);
              }
            })
          }*/
        },
      },

      prevButton: 'Previous',

      nextButton: 'Next',
    }
  }
});
