import EmberObject from '@ember/object';
import Route from '@ember/routing/route';
import { set } from '@ember/object';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {
    return {
      nodes: [
        {
          title: 'Picture Matrix contain',
          description: faker.lorem.paragraph(),
          images: '',
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
          typeName: '选择题',
          quesType: 'picture-choice', //select, fill
          selectType: 'radio',
          showStyle: 'matrix',
          textDirection:'', //in-block ,out-block, empty
          pictureSize: '',  //picture-large, picture-small
          objectFit: 'contain',
          uuid: faker.date.between('2016-01-01', '2016-12-31'),
          isMust:false,
          number:'2',
          options:[
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: '',
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: {
                ratio: 0.666,
                natural:'/images/sample-random/sample-random-0.666-16.jpeg',
                thumbnail:'/images/sample-random/sample-random-0.666-16-thumbnail.jpeg',
              },
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: '',
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: {
                ratio: 0.562,
                natural:'/images/sample-random/sample-random-0.562-12.jpeg',
                thumbnail:'/images/sample-random/sample-random-0.562-12-thumbnail.jpeg',
              },
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: '',
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
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: '',
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
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: '',
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: {
                ratio: 1.335,
                natural:'/images/sample-random/sample-random-1.335-34.jpeg',
                thumbnail:'/images/sample-random/sample-random-1.335-34-thumbnail.jpeg',
              },
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: '',
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
            })
          ],
        },
        {
          title: 'Picture Matrix',
          description: faker.lorem.paragraph(),
          images: '',
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
          typeName: '选择题',
          quesType: 'picture-choice', //select, fill
          selectType: 'radio',
          showStyle: 'matrix',
          textDirection:'empty', //in-block ,out-block, empty
          pictureSize: '',  //picture-large, picture-small
          objectFit: 'cover',
          uuid: faker.date.between('2016-01-01', '2016-12-31'),
          isMust:false,
          number:'2',
          options:[
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: '',
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
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: '',
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: {
                ratio: 1.335,
                natural:'/images/sample-random/sample-random-1.335-34.jpeg',
                thumbnail:'/images/sample-random/sample-random-1.335-34-thumbnail.jpeg',
              },
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            }),
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: '',
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
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: '',
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
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: '',
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'radio', // 选项的Icon
              image: {
                ratio: 0.58,
                natural:'/images/sample-random/sample-random-0.58-13.jpeg',
                thumbnail:'/images/sample-random/sample-random-0.58-13-thumbnail.jpeg',
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
    };
  }
});
