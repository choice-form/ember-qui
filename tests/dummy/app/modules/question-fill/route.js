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
        text:'',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: '', // 选项的Icon
        inputType: 'input', // 'select', 'input', 'select-input',
        inputRule: 'time', //输入控件初始化规则
        value: '',
        placeholder: '请输入时间',
      }),
      Ember.Object.create({
        selected: '',
        text: '',
        uuid: "443E6B4F-D705-483D-905F-07E420920E19",
        icon: '',
        inputType: 'input',
        inputRule: 'count',
        value: faker.address.streetAddress(true),
        placeholder: '请输入字数',
      }),Ember.Object.create({
        selected: '',
        text:'',
        uuid: "299CA073-8FD0-4C6F-4C07-02B063AC8C91",
        icon: '', // 选项的Icon
        inputType: 'input', // 'select', 'input', 'select-input',
        inputRule: 'int', //输入控件初始化规则
        value: '',
        placeholder: '请输入整数',
      }),
      Ember.Object.create({
        selected: '',
        text: '',
        uuid: "443E6B4F-D705-483D-905F-07E420920E12",
        icon: '',
        inputType: 'input',
        inputRule: 'float',
        value: faker.address.streetAddress(true),
        placeholder: '请输入小数',
      }),Ember.Object.create({
        selected: '',
        text:'',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: '', // 选项的Icon
        inputType: 'input', // 'select', 'input', 'select-input',
        inputRule: 'calendar', //输入控件初始化规则
        value: '',
        placeholder: '选择日期',
      }),
    ];

    return {
      title:faker.address.streetAddress(true),
      description: faker.lorem.paragraph(),
      images:[1].map(function () {
        return faker.image.image(360, 360, true)
      }),
      typeName:'选择题',

      type: 'fill', //select, fill
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
