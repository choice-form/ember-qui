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
          title: faker.lorem.sentences(),
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
          renderId:'775519',
          typeName: '上传题',
          quesType: 'file-upload', //select, fill
          selectType: '',
          uuid: faker.date.between('2016-01-01', '2016-12-31'),
          isMust:false,
          number:'2',
          options:[
            Ember.Object.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: '上传动物图片1',
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'upload', // 选项的Icon
              image: '/images/sample-1.jpg',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: '上传动物图片2',
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'upload', // 选项的Icon
              image: '/images/sample-3.jpg',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: '上传动物图片3',
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'upload', // 选项的Icon
              image: '/images/sample-2.jpg',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
          ],
        },
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

      prevButton: 'Previous',

      nextButton: 'Next',
    }
  }
});
