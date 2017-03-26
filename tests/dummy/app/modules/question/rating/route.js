import Route from 'ember-route';
import set from 'ember-metal/set';
import Ember from 'ember';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {

    return {
      nodes: [
        {
          title: faker.finance.accountName(),
          description: faker.lorem.paragraph(),
          images: '',
          typeName: '分值打分题',
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
          quesType: 'rating',
          selectType: '',
          showStyle: '',
          uuid: '002',
          isMust: true,
          number: '4',

          options:[
            Ember.Object.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: `图形打分1##/images/sample-1.jpg?w=20&h=30##${faker.finance.accountName()}`,
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
              icon: 'rating-star', // 选项的Icon
              emoji: ['☹️', '😍'],
              value: '5',
              count: '5',
              marks: '',
              placeholder: '',
            }),
            Ember.Object.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: `图形打分2##/images/sample-1.jpg?w=20&h=30##${faker.finance.accountName()}`,
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'rating-love', // 选项的Icon
              value: '0',
              count: '6',
              marks: [1, 2, 3, 4, 5, 6].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            Ember.Object.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C92",
              icon: 'rating-star', // 选项的Icon
              value: '2',
              count: '4',
              marks: [1, 2, 3, 4].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            Ember.Object.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'rating-thumbs-up', // 选项的Icon
              value: '1',
              count: '7',
              marks: [1, 2, 3, 4, 5, 6, 7].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            Ember.Object.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'rating-thumbs-down', // 选项的Icon
              value: '1',
              count: '3',
              marks: [1, 2, 3].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            Ember.Object.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'rating-crown', // 选项的Icon
              value: '1',
              count: '3',
              marks: [1, 2, 3].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            Ember.Object.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'rating-flower', // 选项的Icon
              value: '1',
              count: '3',
              marks: [1, 2, 3].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            Ember.Object.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'rating-ornament', // 选项的Icon
              value: '1',
              count: '3',
              marks: [1, 2, 3].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            Ember.Object.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'rating-bulb', // 选项的Icon
              value: '1',
              count: '3',
              marks: [1, 2, 3].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            Ember.Object.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'rating-game', // 选项的Icon
              value: '1',
              count: '3',
              marks: [1, 2, 3].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            Ember.Object.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'rating-baby', // 选项的Icon
              value: '1',
              count: '3',
              marks: [1, 2, 3].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            Ember.Object.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'rating-medal', // 选项的Icon
              value: '1',
              count: '3',
              marks: [1, 2, 3].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            Ember.Object.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'rating-bell', // 选项的Icon
              value: '1',
              count: '3',
              marks: [1, 2, 3].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),

            Ember.Object.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'rating-bell', // 选项的Icon
              value: '1',
              count: '6',
              marks: [1, 2, 3].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            Ember.Object.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'rating-medal', // 选项的Icon
              value: '1',
              count: '3',
              marks: [1, 2, 3].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            Ember.Object.create({
              selected: '',
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.sentence(),
              description: 'Rating Labels',
              uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
              icon: 'rating-bell', // 选项的Icon
              inputType: 'input', // 'select', 'input', 'select-input',
              inputRule: 'timeRange', //输入控件初始化规则
              value: '1',
              count: '3',
              marks: [1, 2, 3].map(function () {
                return faker.random.number();
              }),
              placeholder: '',
            }),
            Ember.Object.create({
              selected: false,
              renderId: faker.date.between('2016-01-01', '2016-12-31'),
              text: faker.lorem.paragraph(),
              uuid: "4ghE6B4F-D705-483D-905F-07E420920E18",
              icon: 'radio',
              inputType: 'select',
              inputRule: '',
              value: '选项',
              placeholder: 'input count',
            }),
          ],
        }
      ],

      handleEvents: {
        handleOptionInput(data, option, question){
          console.log(data);
          console.log(option);
          console.log(question);
          if(option.inputType){
            const value = data;
            console.log('这里是选项备注:' + value);
            return true;
          }
          const value = data;
          const newValue = option.selected ? value : value;
          set(option, 'value', newValue);
          return true;
        },

        handleOptionClick: (option, node) => {
          console.log(option);
          console.log(node);
          if (option.toggleProperty('selected')) {
            node.options.forEach((opt) => {
              if (opt != option) {
                set(opt, 'selected', false);
              }
            })
          }

          return true;
        },



      },

      prevButton: 'Previous',

      nextButton: 'Next',
    }
  }
});
