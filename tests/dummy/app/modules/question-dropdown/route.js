import Route from 'ember-route';
import set from 'ember-metal/set';
import get from 'ember-metal/get';
import Ember from 'ember';
import faker from 'faker';


export default Route.extend({
  model() {

    let options = [
      Ember.Object.create({
        selected: '',
        text: '',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'svg-folder', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        menus:[
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
      title:faker.address.streetAddress(true),
      description: faker.lorem.paragraph(),
      images:[1].map(function () {
        return faker.image.image(360, 360, true)
      }),
      typeName:'分值打分题',

      type: 'dropdown', //select, fill, valuemark, graphmark, menu
      selectType: '',
      showStyle: '',
      id: '002',

      options,

      handleOptionClick: (option) => {
        console.log(option);
        if (option.toggleProperty('selected')) {

          options.forEach((opt) => {
            if (opt != option) {
              set(opt, 'selected', false);
            }
          })
        }
      },

      prevButton:{
        text:'上一题',
        handlePrev:()=>{
          console.log('点击了上一题');
        }
      },

      nextButton:{
        text:'下一题',
        handleNext:()=>{
          console.log('点击了下一题');
        }
      }

    }
  }
});
