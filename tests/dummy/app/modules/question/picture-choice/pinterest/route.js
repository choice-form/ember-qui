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
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
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
              selected: true,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: {
                ratio: 0.666,
                natural:'/images/sample-random/sample-random-0.666-4.jpeg',
                thumbnail:'/images/sample-random/sample-random-0.666-4-thumbnail.jpeg',
              },
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: true,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: {
                ratio: 1.164,
                natural:'/images/sample-random/sample-random-1.164-23.jpeg',
                thumbnail:'/images/sample-random/sample-random-1.164-23-thumbnail.jpeg',
              },
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.paragraph(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: {
                ratio: 1.414,
                natural:'/images/sample-random/sample-random-1.414-24.jpeg',
                thumbnail:'/images/sample-random/sample-random-1.414-24-thumbnail.jpeg',
              },
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: {
                ratio: 1.335,
                natural:'/images/sample-random/sample-random-1.335-27.jpeg',
                thumbnail:'/images/sample-random/sample-random-1.335-27-thumbnail.jpeg',
              },
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.paragraph(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: {
                ratio: 1.499,
                natural:'/images/sample-random/sample-random-1.499-38.jpeg',
                thumbnail:'/images/sample-random/sample-random-1.499-38-thumbnail.jpeg',
              },
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.paragraph(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: {
                ratio: 1.335,
                natural:'/images/sample-random/sample-random-1.335-27.jpeg',
                thumbnail:'/images/sample-random/sample-random-1.335-27-thumbnail.jpeg',
              },
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
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
            Ember.Object.create({
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
            Ember.Object.create({
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
          ],
        },
        {
          title: 'Picture Pinterest',
          description: faker.lorem.paragraph(),
          images: '',
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
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
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: {
                ratio: 0.667,
                natural:'/images/sample-random/sample-random-0.667-11.jpeg',
                thumbnail:'/images/sample-random/sample-random-0.667-11-thumbnail.jpeg',
              },
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: {
                ratio: 1.164,
                natural:'/images/sample-random/sample-random-1.164-23.jpeg',
                thumbnail:'/images/sample-random/sample-random-1.164-23-thumbnail.jpeg',
              },
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.paragraph(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: {
                ratio: 0.666,
                natural:'/images/sample-random/sample-random-0.666-4.jpeg',
                thumbnail:'/images/sample-random/sample-random-0.666-4-thumbnail.jpeg',
              },
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: {
                ratio: 1.369,
                natural:'/images/sample-random/sample-random-1.369-26.jpeg',
                thumbnail:'/images/sample-random/sample-random-1.369-26-thumbnail.jpeg',
              },
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.paragraph(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: {
                ratio: 1.335,
                natural:'/images/sample-random/sample-random-1.335-27.jpeg',
                thumbnail:'/images/sample-random/sample-random-1.335-27-thumbnail.jpeg',
              },
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.paragraph(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: {
                ratio: 0.633,
                natural:'/images/sample-random/sample-random-0.633-9.jpeg',
                thumbnail:'/images/sample-random/sample-random-0.633-9-thumbnail.jpeg',
              },
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
          return true;
        },
      },

      prevButton: 'Previous',

      nextButton: 'Next',
    }
  }
});
