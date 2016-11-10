/* eslint-disable */
import Route from 'ember-route';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import Ember from 'ember';
import faker from 'faker';
import {later} from 'ember-runloop';



export default Route.extend({
  model() {
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
          renderId: '4567yy0-0987',
          quesType: 'ranking',
          selectType: '',
          showStyle: '',
          uuid: '005',

          options:[
            Ember.Object.create({
              text: `1-${faker.lorem.paragraph()}`,
              renderId: '4567890-0987',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
              icon: 'ranking', // 选项的Icon
              sortNo: '1',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              sortStateClass: '',
            }),
            Ember.Object.create({
              text: `2-${faker.finance.accountName()}`,
              renderId: '4567890-0989',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
              icon: 'ranking', // 选项的Icon
              sortNo: '2',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              sortStateClass: '',
            }),
            Ember.Object.create({
              text: `3-${faker.finance.accountName()}`,
              renderId: '4567890-0911',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
              icon: 'ranking', // 选项的Icon
              sortNo: '3',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              sortStateClass: '',
            }),
            Ember.Object.create({
              text: `4-${faker.finance.accountName()}`,
              renderId: '4567890-0912',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
              icon: 'ranking', // 选项的Icon
              sortNo: '',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              sortStateClass: '',
            }),
            Ember.Object.create({
              text: `5-${faker.finance.accountName()}`,
              renderId: '4567890-0913',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
              icon: 'ranking', // 选项的Icon
              sortNo: '',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              sortStateClass: '',
            }),
            Ember.Object.create({
              text: `6-${faker.finance.accountName()}`,
              renderId: '4567890-0914',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
              icon: 'ranking', // 选项的Icon
              sortNo: '',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              sortStateClass: '',
            }),
            Ember.Object.create({
              text: `7-${faker.finance.accountName()}`,
              renderId: '4567890-0915',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
              icon: 'ranking', // 选项的Icon
              sortNo: '',
              inputType: '', // 'select', 'input', 'select-input, ower-input',
              inputRule: '', //输入控件初始化规则
              value: '',
              placeholder: '',
            })
          ],
        },
      ],

      handleEvents: {

        handleOptionInput(data, option, question){
          console.log(data);
          console.log(option);
          console.log(question);

          return true;
        },
        handleOptionDrop(oldIndex, newIndex, question){
          console.log(oldIndex);
          console.log(newIndex);
          return [newIndex];
        },
      },

      prevButton: 'Previous',

      nextButton: 'Next',
    }
  }
});
