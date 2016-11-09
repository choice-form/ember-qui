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
          picStyle:'superscript',
          textDirection:'insert-block', //in-block ,out-block, empty
          pictureSize: '',  //picture-large, picture-small
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
              image: (function () {
                const num = parseInt(Math.random() * 40);
                return {
                  ratio: 0.6666667,
                  natural: `/images/sample-random/sample-random-${num}.jpeg`,
                  thumbnail:`/images/sample-random/sample-random-${num}.jpeg`,
                }})(),              inputType: '', // 'select', 'input', 'select-input, ower-input',
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
              image: (function () {
                const num = parseInt(Math.random() * 40);
                return {
                  ratio: 1.6666667,
                  natural: `/images/sample-random/sample-random-${num}.jpeg`,
                  thumbnail:`/images/sample-random/sample-random-${num}.jpeg`,
                }})(),              inputType: '', // 'select', 'input', 'select-input, ower-input',
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
              image: (function () {
                const num = parseInt(Math.random() * 40);
                return {
                  ratio: 1.0666667,
                  natural: `/images/sample-random/sample-random-${num}.jpeg`,
                  thumbnail:`/images/sample-random/sample-random-${num}.jpeg`,
                }})(),              inputType: '', // 'select', 'input', 'select-input, ower-input',
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
              image: (function () {
                const num = parseInt(Math.random() * 40);
                return {
                  ratio: 0.4666667,
                  natural: `/images/sample-random/sample-random-${num}.jpeg`,
                  thumbnail:`/images/sample-random/sample-random-${num}.jpeg`,
                }})(),              inputType: '', // 'select', 'input', 'select-input, ower-input',
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
              image: (function () {
                const num = parseInt(Math.random() * 40);
                return {
                  ratio: 0.9666667,
                  natural: `/images/sample-random/sample-random-${num}.jpeg`,
                  thumbnail:`/images/sample-random/sample-random-${num}.jpeg`,
                }})(),              inputType: '', // 'select', 'input', 'select-input, ower-input',
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
              image: (function () {
                const num = parseInt(Math.random() * 40);
                return {
                  ratio: 0.6666667,
                  natural: `/images/sample-random/sample-random-${num}.jpeg`,
                  thumbnail:`/images/sample-random/sample-random-${num}.jpeg`,
                }})(),              inputType: '', // 'select', 'input', 'select-input, ower-input',
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
          pictureSize: '',  //picture-large, picture-small
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
              image: (function () {
                const num = parseInt(Math.random() * 40);
                return {
                  ratio: 1.2666667,
                  natural: `/images/sample-random/sample-random-${num}.jpeg`,
                  thumbnail:`/images/sample-random/sample-random-${num}.jpeg`,
                }})(),              inputType: '', // 'select', 'input', 'select-input, ower-input',
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
              image: (function () {
                const num = parseInt(Math.random() * 40);
                return {
                  ratio: 1.1666667,
                  natural: `/images/sample-random/sample-random-${num}.jpeg`,
                  thumbnail:`/images/sample-random/sample-random-${num}.jpeg`,
                }})(),              inputType: '', // 'select', 'input', 'select-input, ower-input',
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
              image: (function () {
                const num = parseInt(Math.random() * 40);
                return {
                  ratio: 1.3666667,
                  natural: `/images/sample-random/sample-random-${num}.jpeg`,
                  thumbnail:`/images/sample-random/sample-random-${num}.jpeg`,
                }})(),              inputType: '', // 'select', 'input', 'select-input, ower-input',
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
              image: (function () {
                const num = parseInt(Math.random() * 40);
                return {
                  ratio: 1.5666667,
                  natural: `/images/sample-random/sample-random-${num}.jpeg`,
                  thumbnail:`/images/sample-random/sample-random-${num}.jpeg`,
                }})(),              inputType: '', // 'select', 'input', 'select-input, ower-input',
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
              image: (function () {
                const num = parseInt(Math.random() * 40);
                return {
                  ratio: 0.4666667,
                  natural: `/images/sample-random/sample-random-${num}.jpeg`,
                  thumbnail:`/images/sample-random/sample-random-${num}.jpeg`,
                }})(),              inputType: '', // 'select', 'input', 'select-input, ower-input',
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
              image: (function () {
                const num = parseInt(Math.random() * 40);
                return {
                  ratio: 0.8666667,
                  natural: `/images/sample-random/sample-random-${num}.jpeg`,
                  thumbnail:`/images/sample-random/sample-random-${num}.jpeg`,
                }})(),              inputType: '', // 'select', 'input', 'select-input, ower-input',
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
      },

      prevButton: 'Previous',

      nextButton: 'Next',
    }
  }
});
