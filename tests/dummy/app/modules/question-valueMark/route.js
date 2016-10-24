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
        text: faker.address.streetAddress(true),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: '', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: 3,
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        text: faker.address.streetAddress(true),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: '', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: 2,
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        text: faker.address.streetAddress(true),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: '', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: 1,
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        text: faker.address.streetAddress(true),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: '', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: 0,
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        text: faker.address.streetAddress(true),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: '', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: 6,
        placeholder: '',
      }),
    ];

    return {

      header:{
        title:faker.address.streetAddress(true),
        description: faker.lorem.paragraph(),
        images:[1,2].map(function () {
          return faker.image.image(360, 360, true)
        }),
        typeName:'选择题',
      },

      nodeInfo: {
        type: 'valueMark', //select, fill,valueMark
        selectType: 'range',
        showStyle: '',
        id: '001',
      },

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

      button:{
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
  }
});
