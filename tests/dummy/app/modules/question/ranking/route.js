/* eslint-disable */
import Route from 'ember-route';
import set from 'ember-metal/set';
import Ember from 'ember';
import faker from 'faker';

export default Route.extend({
  model() {
    let options = [
      Ember.Object.create({
        text: faker.lorem.paragraph(),
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'ranking', // 选项的Icon
        sortNo: '',
        inputType: '', // 'select', 'input', 'select-input, ower-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        placeholder: '',
      }),
      Ember.Object.create({
        text: faker.finance.accountName(),
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'ranking', // 选项的Icon
        sortNo: '',
        inputType: '', // 'select', 'input', 'select-input, ower-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        placeholder: '',
      }),
      Ember.Object.create({
        text: faker.finance.accountName(),
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'ranking', // 选项的Icon
        sortNo: '',
        inputType: '', // 'select', 'input', 'select-input, ower-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        placeholder: '',
      }),
      Ember.Object.create({
        text: faker.finance.accountName(),
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'ranking', // 选项的Icon
        sortNo: '',
        inputType: '', // 'select', 'input', 'select-input, ower-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        placeholder: '',
      }),
      Ember.Object.create({
        text: faker.finance.accountName(),
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'ranking', // 选项的Icon
        sortNo: '',
        inputType: '', // 'select', 'input', 'select-input, ower-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        placeholder: '',
      }),
      Ember.Object.create({
        text: faker.finance.accountName(),
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'ranking', // 选项的Icon
        sortNo: '',
        inputType: '', // 'select', 'input', 'select-input, ower-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        placeholder: '',
      }),
      Ember.Object.create({
        text: faker.finance.accountName(),
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'ranking', // 选项的Icon
        sortNo: '',
        inputType: '', // 'select', 'input', 'select-input, ower-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        placeholder: '',
      })
    ];

    return {
      nodes: [
        {
          title: faker.finance.accountName(),
          description: faker.lorem.paragraph(),
          images: [
            {
              ratio: 0.667,
              natural: '/images/sample-1.jpg',
              thumbnail: '/images/sample-1-thumbnail.jpg',
            }
          ],
          typeName: '排序题',
          renderId: '4567890-0987',
          quesType: 'ranking',
          selectType: '',
          showStyle: '',
          uuid: '005',

          options,
        },
      ],

      handleEvents: {

        handleOptionDrop(startIndex, endIndex, question){
          console.log(startIndex);
          console.log(endIndex);
          console.log(question);

          const startOption = question.options[parseInt(startIndex)];
          set(startOption, 'sortNo', parseInt(endIndex));

          return true;
        },
      },

      prevButton: 'Previous',

      nextButton: 'Next',
    }
  }
});
