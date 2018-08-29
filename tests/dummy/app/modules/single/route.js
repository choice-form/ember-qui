import EmberObject from '@ember/object';
import Route from '@ember/routing/route';
import { set } from '@ember/object';
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
            ratio: 0.6666667,
            natural:'/images/sample-1.jpg',
            thumbnail:'/images/sample-1-thumbnail.jpg',
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
          title: faker.finance.accountName(),
          description: faker.lorem.paragraph(),
          images: '',
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
          typeName: '选择题',
          minSelect:'1',
          maxSelect:'2',
          quesType: 'choice', //select, fill
          selectType: 'radio',
          showStyle: '',
          uuid: '001',
          isMust:true,
          number:'1',
          options:[
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
              icon: 'radio', // 选项的Icon
              inputType: 'select-input', // 'select', 'input', 'select-input,
              inputRule: 'timeRange', //输入控件初始化规则
              value: 'Here is options comment',
              placeholder: 'comment',
            }),
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: "443E6B4F-D705-483D-905F-07E420920E19",
              icon: 'radio',
              inputType: '',
              inputRule: '',
              value: '',
              placeholder: 'placeholder',
            }),
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: "443E6B4F-D705-483D-905F-07E420920E18",
              icon: 'radio',
              inputType: 'select',
              inputRule: 'count',
              value: '选项',
              placeholder: 'input count',
            }),
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: "443E6B4F-D705-483D-905F-07E420920E15",
              icon: 'radio',
              inputType: 'select-input',
              inputRule: 'time',
              value: 'input time',
              placeholder: '',
            })
          ],
        },
        {
          title: faker.lorem.words(),
          description: faker.lorem.paragraph(),
          images: '',
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
          typeName: '图标题',
          quesType: 'icon', //select, fill
          selectType: 'checkbox',
          showStyle: '',
          uuid: '001',
          isMust: true,
          number: '1',
          options:[
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.words(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/c0872608-5cb0-44c5-907e-f61b64fef3fc.svg',
            }),
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.words(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/089ff4a5-bd7e-4493-a991-fec1f251dee2.svg',
            }),
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.words(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/16d016f3-cbe9-4e21-9ed0-53d49a67c0bf.svg',
            }),
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.words(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/83a44a20-7ca3-4254-b43b-07cc987aa3ee.svg',
            }),
            EmberObject.create({
              selected: true,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.words(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/1c2fb2d2-fd88-45d7-afce-a6176f50af2d.svg',
            }),
            EmberObject.create({
              selected: true,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.words(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/e4cff5bb-6989-4e58-bc38-2742c3986231.svg',
            }),
            EmberObject.create({
              selected: true,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.words(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/c00007b6-fcee-44c6-823f-090240994396.svg',
            })
          ],
        },
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
        {
          title: faker.finance.accountName(),
          description: faker.lorem.paragraph(),
          images: '',
          typeName: '分值打分题',
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
          quesType: 'rating',
          selectType: '',
          showStyle: '',
          uuid: '002',
          isMust: true,
          number: '4',

          options:[
            EmberObject.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
              icon: 'star', // 选项的Icon
              emoji: ['☹️', '😍'],
              value: '5',
              count: '5',
              marks: [1, 2, 3, 4, 5].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            EmberObject.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'thumbs-up', // 选项的Icon
              value: '0',
              count: '6',
              marks: [1, 2, 3, 4, 5, 6].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            EmberObject.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C92",
              icon: 'baloon', // 选项的Icon
              inputType: '', // 'select', 'input', 'select-input',
              inputRule: '', //输入控件初始化规则
              value: '2',
              count: '4',
              marks: [1, 2, 3, 4].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            EmberObject.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'love-favorite', // 选项的Icon
              inputType: '', // 'select', 'input', 'select-input',
              inputRule: '', //输入控件初始化规则
              value: '1',
              count: '7',
              marks: [1, 2, 3, 4, 5, 6, 7].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            EmberObject.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'crown', // 选项的Icon
              inputType: 'input', // 'select', 'input', 'select-input',
              inputRule: 'timeRange', //输入控件初始化规则
              value: '1',
              count: '3',
              marks: [1, 2, 3].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            })
          ],
        },
        {
          title: faker.finance.accountName(),
          description: faker.lorem.paragraph(),
          images: '',
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
          typeName: '选择题',
          minSelect:'1',
          maxSelect:'2',
          quesType: 'choice', //select, fill
          selectType: 'radio',
          showStyle: '',
          uuid: '001',
          isMust:true,
          number:'1',
          options:[
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
              icon: 'radio', // 选项的Icon
              inputType: 'select-input', // 'select', 'input', 'select-input,
              inputRule: 'timeRange', //输入控件初始化规则
              value: 'Here is options comment',
              placeholder: 'comment',
            }),
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: "443E6B4F-D705-483D-905F-07E420920E19",
              icon: 'radio',
              inputType: '',
              inputRule: '',
              value: '',
              placeholder: 'placeholder',
            }),
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: "443E6B4F-D705-483D-905F-07E420920E18",
              icon: 'radio',
              inputType: 'select',
              inputRule: 'count',
              value: '选项',
              placeholder: 'input count',
            }),
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              uuid: "443E6B4F-D705-483D-905F-07E420920E15",
              icon: 'radio',
              inputType: 'select-input',
              inputRule: 'time',
              value: 'input time',
              placeholder: '',
            })
          ],
        },
        {
          title: faker.lorem.words(),
          description: faker.lorem.paragraph(),
          images: '',
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
          typeName: '图标题',
          quesType: 'icon', //select, fill
          selectType: 'checkbox',
          showStyle: '',
          uuid: '001',
          isMust: true,
          number: '1',
          options:[
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.words(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/c0872608-5cb0-44c5-907e-f61b64fef3fc.svg',
            }),
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.words(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/089ff4a5-bd7e-4493-a991-fec1f251dee2.svg',
            }),
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.words(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/16d016f3-cbe9-4e21-9ed0-53d49a67c0bf.svg',
            }),
            EmberObject.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.words(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/83a44a20-7ca3-4254-b43b-07cc987aa3ee.svg',
            }),
            EmberObject.create({
              selected: true,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.words(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/1c2fb2d2-fd88-45d7-afce-a6176f50af2d.svg',
            }),
            EmberObject.create({
              selected: true,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.words(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/e4cff5bb-6989-4e58-bc38-2742c3986231.svg',
            }),
            EmberObject.create({
              selected: true,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.words(),
              uuid: faker.date.between('2016-01-01', '2016-12-31'),
              icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/c00007b6-fcee-44c6-823f-090240994396.svg',
            })
          ],
        },
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
        {
          title: faker.finance.accountName(),
          description: faker.lorem.paragraph(),
          images: '',
          typeName: '分值打分题',
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
          quesType: 'rating',
          selectType: '',
          showStyle: '',
          uuid: '002',
          isMust: true,
          number: '4',

          options:[
            EmberObject.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
              icon: 'star', // 选项的Icon
              emoji: ['☹️', '😍'],
              value: '5',
              count: '5',
              marks: [1, 2, 3, 4, 5].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            EmberObject.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'thumbs-up', // 选项的Icon
              value: '0',
              count: '6',
              marks: [1, 2, 3, 4, 5, 6].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            EmberObject.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C92",
              icon: 'baloon', // 选项的Icon
              inputType: '', // 'select', 'input', 'select-input',
              inputRule: '', //输入控件初始化规则
              value: '2',
              count: '4',
              marks: [1, 2, 3, 4].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            EmberObject.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'love-favorite', // 选项的Icon
              inputType: '', // 'select', 'input', 'select-input',
              inputRule: '', //输入控件初始化规则
              value: '1',
              count: '7',
              marks: [1, 2, 3, 4, 5, 6, 7].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            EmberObject.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'crown', // 选项的Icon
              inputType: 'input', // 'select', 'input', 'select-input',
              inputRule: 'timeRange', //输入控件初始化规则
              value: '1',
              count: '3',
              marks: [1, 2, 3].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            })
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

      prevButton: '上一题',

      nextButton: '下一题',
    };
  }
});
