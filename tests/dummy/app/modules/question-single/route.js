import Route from 'ember-route';
import set from 'ember-metal/set';
import Ember from 'ember';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {
    return {

      intro:{
        title:faker.address.streetAddress(true),
        summary:faker.lorem.paragraph(),
        description: faker.lorem.paragraph(),
        images: [
          {
            natural:'/images/sample-1.jpg',
            thumbnail:'/images/sample-1-thumbnail.jpg',
          },
          {
            natural:'/images/sample-2.jpg',
            thumbnail:'/images/sample-2-thumbnail.jpg',
          },
          {
            natural:'/images/sample-3.jpg',
            thumbnail:'/images/sample-3-thumbnail.jpg',
          }
        ],

        handleEvents: {
          handleNextClick: () => {
            console.log('点击了下一题');
          }
        },

        nextButton: "下一题",
      },

      nodes: [
        {
          title:faker.address.streetAddress(true),
          description: faker.lorem.paragraph(),
          images: [
            {
              natural:'/images/sample-1.jpg',
              thumbnail:'/images/sample-1-thumbnail.jpg',
            },
            {
              natural:'/images/sample-2.jpg',
              thumbnail:'/images/sample-2-thumbnail.jpg',
            },
            {
              natural:'/images/sample-3.jpg',
              thumbnail:'/images/sample-3-thumbnail.jpg',
            }
          ],
          typeName:'分值打分题',
          renderId: '4567890-0987',
          quesType: 'dropdown', //select, fill, valuemark, graphmark, menu
          selectType: '',
          showStyle: '',
          uuid: '002',
          isMust:true,
          number:'3',
          value:'123123',
          placeholder:'请下拉选择',
          options:[
            Ember.Object.create({
              selected:false,
              renderId: '4567890-0987',
              text: faker.name.findName(),
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
              icon: 'svg-folder', // 选项的Icon
              inputType: '', // 'select', 'input', 'select-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected:false,
              renderId: '4567890-0987',
              text: faker.name.findName(),
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'svg-folder', // 选项的Icon
              inputType: '', // 'select', 'input', 'select-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected:false,
              renderId: '4567890-0987',
              text: faker.name.findName(),
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C92",
              icon: 'svg-folder', // 选项的Icon
              inputType: '', // 'select', 'input', 'select-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected:false,
              renderId: '4567890-0987',
              text: faker.name.findName(),
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C93",
              icon: 'svg-folder', // 选项的Icon
              inputType: '', // 'select', 'input', 'select-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
          ],
        },
        {
          title:faker.address.streetAddress(true),
          description: faker.lorem.paragraph(),
          images: [
            {
              natural:'/images/sample-1.jpg',
              thumbnail:'/images/sample-1-thumbnail.jpg',
            }
          ],
          typeName:'选择题',
          renderId: '4567890-0987',
          quesType: 'short-text', //select, fill
          selectType: '',
          showStyle: '',
          uuid: '002',
          isMust:true,
          number:'6',
          options:[
            Ember.Object.create({
              selected: '',
              renderId: '4567890-0987',
              text:'',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
              icon: '', // 选项的Icon
              inputType: 'input', // 'select', 'input', 'select-input',
              inputRule: 'time', //输入控件初始化规则
              value: '',
              placeholder: '选择时间',
            }),
            Ember.Object.create({
              selected: '',
              renderId: '4567890-0987',
              text: '',
              uuid: "443E6B4F-D705-483D-905F-07E420920E19",
              icon: '',
              inputType: 'input',
              inputRule: 'timeRange',
              value: '',
              placeholder: '选择时间范围',
            }),
            Ember.Object.create({
              selected: '',
              renderId: '4567890-0987',
              text:'',
              uuid: "299CA073-8FD0-4C6F-4C07-02B063AC8C91",
              icon: '', // 选项的Icon
              inputType: 'input', // 'select', 'input', 'select-input',
              inputRule: 'date', //输入控件初始化规则
              value: '',
              placeholder: '选择日期',
            }),
            Ember.Object.create({
              selected: '',
              renderId: '4567890-0987',
              text: '',
              uuid: "443E6B4F-D705-483D-905F-07E420920E12",
              icon: '',
              inputType: 'input',
              inputRule: 'dateRange',
              value: '',
              placeholder: '选择日期范围',
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
