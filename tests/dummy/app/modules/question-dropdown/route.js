import Route from 'ember-route';
import set from 'ember-metal/set';
import Ember from 'ember';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {

    let options = [
      Ember.Object.create({
        selected:false,
        renderId: '4567890-0987',
        text: faker.lorem.sentence(),
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
        text: faker.lorem.sentence(),
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
        text: faker.lorem.sentence(),
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
        text: faker.lorem.sentence(),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C93",
        icon: 'svg-folder', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        placeholder: '',
      }),
    ];

    return {
      nodes:[
        {
          title: faker.lorem.words(),
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
          uuid: '002',
          isMust:true,
          number:'3',
          value:'123123',
          placeholder:'请下拉选择',
          options,
        }
      ],

      handleEvents: {
        handleOptionClick: (option, node) => {
          console.log(option);
          console.log(node);
          if (option.toggleProperty('selected')) {

            options.forEach((opt) => {
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
