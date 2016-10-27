import Route from 'ember-route';
import set from 'ember-metal/set';
import Ember from 'ember';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {
    let options = [
      Ember.Object.create({
        selected: false,
        renderId: '4567890-0987',
        text: faker.name.findName(),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/c0872608-5cb0-44c5-907e-f61b64fef3fc.svg',
      }),
      Ember.Object.create({
        selected: false,
        renderId: '4567890-871',
        text: faker.name.findName(),
        uuid: "443E6B4F-D705-483D-905F-07E420920E19",
        icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/089ff4a5-bd7e-4493-a991-fec1f251dee2.svg',
      }),
      Ember.Object.create({
        selected: false,
        renderId: '4567890-0981',
        text:  faker.name.findName(),
        uuid: "443E6B4F-D705-483D-905F-07E420920E18",
        icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/16d016f3-cbe9-4e21-9ed0-53d49a67c0bf.svg',
      }),
      Ember.Object.create({
        selected: false,
        renderId: '4567890-0985',
        text:  faker.name.findName(),
        uuid: "443E6B4F-D705-483D-905F-07E420920E15",
        icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/83a44a20-7ca3-4254-b43b-07cc987aa3ee.svg',
      }),
      Ember.Object.create({
        selected: true,
        renderId: '4567890-0988',
        text:  faker.name.findName(),
        uuid: "443E6B4F-D705-483D-905F-07E420920E12",
        icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/1c2fb2d2-fd88-45d7-afce-a6176f50af2d.svg',
      }),
      Ember.Object.create({
        selected: true,
        renderId: '4567890-0912',
        text:  faker.name.findName(),
        uuid: "443E6B4F-D705-483D-905F-07E420920E12",
        icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/e4cff5bb-6989-4e58-bc38-2742c3986231.svg',
      }),
      Ember.Object.create({
        selected: true,
        renderId: '4567890-0912',
        text:  faker.name.findName(),
        uuid: "443E6B4F-D705-483D-905F-07E420920E12",
        icon: 'https://csvfx-files.b0.upaiyun.com/uploadfiles/UploadSvg/c00007b6-fcee-44c6-823f-090240994396.svg',
      })
    ];

    return {

      control: [
        {
          title: faker.address.streetAddress(true),
          description: faker.lorem.paragraph(),
          images: [1].map(function () {
            return faker.image.image(640, 360, true)
          }),
          renderId:'12213343234',
          typeName: '图标题',
          nodeType: 'icon', //select, fill
          selectType: 'radio',
          showStyle: '',
          uuid: '001',
          isMust:true,
          number:'1',
          options,
        }
      ],

      handleEvents: {
        handleOptionClick: (option, control) => {
          console.log(option);
          console.log(control);
          if (option.toggleProperty('selected')) {

            options.forEach((opt) => {
              if (opt != option) {
                set(opt, 'selected', false);
              }
            })
          }
        },

        handleOptionInput: (option, control) => {
          console.log(option);
          console.log(control);
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
