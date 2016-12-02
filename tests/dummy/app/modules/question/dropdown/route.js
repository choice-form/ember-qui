/* eslint-disable */
import Route from 'ember-route';
import set from 'ember-metal/set';
import Ember from 'ember';
import faker from 'faker';


export default Route.extend({
  model() {

    let options = [
      Ember.Object.create({
        selected:false,
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        text: faker.lorem.sentence(),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'svg-folder', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        placeholder: '',
      }),
      Ember.Object.create({
        selected:false,
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        text: faker.lorem.sentence(),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
        icon: 'svg-folder', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        placeholder: '',
      }),
      Ember.Object.create({
        selected:false,
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        text: faker.lorem.sentence(),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C92",
        icon: 'svg-folder', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        placeholder: '',
      }),
      Ember.Object.create({
        selected:false,
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        text: faker.lorem.sentence(),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C93",
        icon: 'svg-folder', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        placeholder: '',
      }),
    ];

    return {
      nodes:[
        {
          title: faker.lorem.words(),
          description: faker.lorem.paragraph(),
          typeName:'分值打分题',
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
          quesType: 'dropdown', //select, fill, valuemark, graphmark, menu
          uuid: '002',
          isMust:true,
          number:'3',
          value:'123123',
          placeholder:'请下拉选择',
          options,
        }
      ],

      handleEvents: {
        handleQuestionInput(dynamic, question){
          console.log(dynamic);
          console.log(question);
          const value = question.options[parseInt(dynamic)].text;
          set(question,'value',value);
          return true;
        },
      },

      prevButton: 'Previous',

      nextButton: 'Next',

    }
  }
});
