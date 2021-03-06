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
              icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/089ff4a5-bd7e-4493-a991-fec1f251dee2.svg',
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
              icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/089ff4a5-bd7e-4493-a991-fec1f251dee2.svg',
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
    };
  }
});
