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
          title: 'Picture Pinterest insert-block',
          description: faker.lorem.paragraph(),
          images: '',
          renderId:'775519',
          typeName: '选择题',
          quesType: 'picture-choice', //select, fill
          selectType: 'radio',
          showStyle: 'pinterest',
          textDirection:'insert-block', //in-block ,out-block, empty
          pictureSize: 'picture-large',  //picture-large, picture-small
          uuid: faker.date.between('2016-01-01', '2016-12-31'),
          isMust:false,
          number:'2',
          options:[
            Ember.Object.create({
              selected: false,
              renderId: '4567890-0987',
              text: faker.lorem.sentence(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: '/images/sample-pinterest/sample-pinterest-1.jpg',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: '4567890-0987',
              text: faker.lorem.sentence(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: '/images/sample-pinterest/sample-pinterest-2.jpg',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: '4567890-0987',
              text: faker.lorem.paragraph(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: '/images/sample-pinterest/sample-pinterest-3.jpg',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: '4567890-0987',
              text: faker.lorem.sentence(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: '/images/sample-pinterest/sample-pinterest-4.jpg',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: '4567890-0987',
              text: faker.lorem.paragraph(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: '/images/sample-pinterest/sample-pinterest-5.jpg',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: '4567890-0987',
              text: faker.lorem.paragraph(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: '/images/sample-pinterest/sample-pinterest-6.jpg',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            })
          ],
        },
        {
          title: 'Picture Pinterest',
          description: faker.lorem.paragraph(),
          images: '',
          renderId:'775519',
          typeName: '选择题',
          quesType: 'picture-choice', //select, fill
          selectType: 'radio',
          showStyle: 'pinterest',
          textDirection:'out-block', //in-block ,out-block, empty
          pictureSize: 'picture-large',  //picture-large, picture-small
          uuid: faker.date.between('2016-01-01', '2016-12-31'),
          isMust:false,
          number:'2',
          options:[
            Ember.Object.create({
              selected: false,
              renderId: '4567890-0987',
              text: faker.lorem.sentence(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: '/images/sample-pinterest/sample-pinterest-7.jpg',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: '4567890-0987',
              text: faker.lorem.sentence(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: '/images/sample-pinterest/sample-pinterest-8.jpg',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: '4567890-0987',
              text: faker.lorem.paragraph(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: '/images/sample-pinterest/sample-pinterest-9.jpg',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: '4567890-0987',
              text: faker.lorem.sentence(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: '/images/sample-pinterest/sample-pinterest-10.jpg',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: '4567890-0987',
              text: faker.lorem.paragraph(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: '/images/sample-pinterest/sample-pinterest-11.jpg',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: '4567890-0987',
              text: faker.lorem.paragraph(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: '/images/sample-pinterest/sample-pinterest-12.jpg',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
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

      prevButton: 'Previous',

      nextButton: 'Next',
    }
  }
});
