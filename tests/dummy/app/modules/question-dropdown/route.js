import Route from 'ember-route';
import set from 'ember-metal/set';
import Ember from 'ember';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {

    let options = [
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: '',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'svg-folder', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '',

        dropDowns:[
          {
            selected:false,
            id:'0',
            text:faker.address.streetAddress(true),
          },
          {
            selected:false,
            id:'1',
            text:faker.address.streetAddress(true),
          },
          {
            selected:false,
            id:'2',
            text:faker.address.streetAddress(true),
          },
          {
            selected:false,
            id:'3',
            text:faker.address.streetAddress(true),
          },
          {
            selected:false,
            id:'4',
            text:faker.address.streetAddress(true),
          },
          {
            selected:false,
            id:'5',
            text:faker.address.streetAddress(true),
          }
        ],
        placeholder: '请下拉选择',
      }),
    ];

    return {
      control:[
        {
          title:faker.address.streetAddress(true),
          description: faker.lorem.paragraph(),
          images:[1].map(function () {
            return faker.image.image(360, 360, true)
          }),
          typeName:'分值打分题',
          renderId: '4567890-0987',
          nodeType: 'dropdown', //select, fill, valuemark, graphmark, menu
          selectType: '',
          showStyle: '',
          uuid: '002',
          isMust:true,
          number:'3',
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
