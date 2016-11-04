/* eslint-disable */
import Route from 'ember-route';
import set from 'ember-metal/set';
import Ember from 'ember';
import faker from 'faker';

export default Route.extend({
  model() {

    let options = [
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: '',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: '', // 选项的Icon
        inputType: 'input', // 'select', 'input', 'select-input',
        inputRule: 'time', //输入控件初始化规则
        value: '',
        placeholder: '选择时间',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: '',
        uuid: "443E6B4F-D705-483D-905F-07E420920E19",
        icon: '',
        inputType: 'input',
        inputRule: 'timeRange',
        value: '',
        placeholder: '选择时间范围',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: '',
        uuid: "299CA073-8FD0-4C6F-4C07-02B063AC8C91",
        icon: '', // 选项的Icon
        inputType: 'input', // 'select', 'input', 'select-input',
        inputRule: 'date', //输入控件初始化规则
        value: '',
        placeholder: '选择日期',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: '',
        uuid: "443E6B4F-D705-483D-905F-07E420920E12",
        icon: '',
        inputType: 'input',
        inputRule: 'dateRange',
        value: '',
        placeholder: '选择日期范围',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: '',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90a",
        icon: '', // 选项的Icon
        inputType: 'input', // 'select', 'input', 'select-input',
        inputRule: 'int', //输入控件初始化规则
        value: '',
        placeholder: 'int',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: '',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C907",
        icon: '', // 选项的Icon
        inputType: 'input', // 'select', 'input', 'select-input',
        inputRule: 'phone', //输入控件初始化规则
        value: '',
        placeholder: 'phone',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: '',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C905",
        icon: '', // 选项的Icon
        inputType: 'input', // 'select', 'input', 'select-input',
        inputRule: 'float', //输入控件初始化规则
        value: '',
        placeholder: 'float',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: '',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C901",
        icon: '', // 选项的Icon
        inputType: 'input', // 'select', 'input', 'select-input',
        inputRule: 'email', //输入控件初始化规则
        value: '',
        placeholder: 'email',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: '',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C902",
        icon: '', // 选项的Icon
        inputType: 'input', // 'select', 'input', 'select-input',
        inputRule: 'postCode', //输入控件初始化规则
        value: '',
        placeholder: 'postCode',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: '',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C903",
        icon: '', // 选项的Icon
        inputType: 'input', // 'select', 'input', 'select-input',
        inputRule: 'url', //输入控件初始化规则
        value: '',
        placeholder: 'url',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: '',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C903",
        icon: '', // 选项的Icon
        inputType: 'input', // 'select', 'input', 'select-input',
        inputRule: 'noValidation', //输入控件初始化规则
        value: '',
        placeholder: 'noValidation',
      }),
      Ember.Object.create({
        selected: '',
        renderId: '4567890-0987',
        text: '',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C903",
        icon: '', // 选项的Icon
        inputType: 'input', // 'select', 'input', 'select-input',
        inputRule: 'count', //输入控件初始化规则
        value: '',
        placeholder: 'count',
      }),
    ];

    return {
      nodes: [
        {
          title: faker.address.streetAddress(true),
          description: faker.lorem.paragraph(),
          images: [
            {
              natural: '/images/sample-1.jpg',
              thumbnail: '/images/sample-1-thumbnail.jpg',
            },
            {
              natural: '/images/sample-2.jpg',
              thumbnail: '/images/sample-2-thumbnail.jpg',
            },
            {
              natural: '/images/sample-3.jpg',
              thumbnail: '/images/sample-3-thumbnail.jpg',
            }
          ],
          typeName: '选择题',
          renderId: '4567890-0987',
          quesType: 'short-text', //select, fill
          selectType: '',
          showStyle: '',
          uuid: '002',
          isMust: true,
          number: '6',
          options,
        }
      ],

      handleEvents: {

        handleOptionInput(data, option, question){
          console.log(data);
          console.log(option);
          console.log(question);

          return true;
        },

      },

      prevButton: '上一题',

      nextButton: '下一题',
    }
  }
});
