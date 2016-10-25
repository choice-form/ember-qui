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
        text: '最低10分,最高100分',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'svg-folder', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '5',
        minValue:'5',
        maxValue: '7',
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        text: '最低30分,最高100分',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
        icon: 'svg-folder', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '0',
        minValue:'0',
        maxValue: '7',
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        text: '最低30分,最高80分',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C92",
        icon: 'svg-folder', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '2',
        minValue:'2',
        maxValue: '7',
        placeholder: '',
      }),
      Ember.Object.create({
        selected: '',
        text: '最低30分,最高100分',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
        icon: 'svg-folder', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '7',
        minValue:'7',
        maxValue: '7',
        placeholder: '',
      })
    ];

    return {
      title:faker.address.streetAddress(true),
      description: faker.lorem.paragraph(),
      images:[1].map(function () {
        return faker.image.image(360, 360, true)
      }),
      typeName:'分值打分题',

      type: 'rating', //select, fill, valuemark
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
