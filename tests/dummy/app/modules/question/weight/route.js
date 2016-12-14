/* eslint-disable */
import Route from 'ember-route';
import set from 'ember-metal/set';
import Ember from 'ember';
import faker from 'faker';

export default Route.extend({
  model() {
    let options = [
      Ember.Object.create({
        text: faker.finance.accountName(),
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: '', // 选项的Icon
        color:'#2DBE60',
        value: '',
        maxValue:100,
      }),
      Ember.Object.create({
        text: faker.finance.accountName(),
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: '', // 选项的Icon
        color:'#0FA6F0',
        value: '',
        maxValue:100,
      }),
      Ember.Object.create({
        text: faker.finance.accountName(),
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: '', // 选项的Icon
        color:'#ca2027',
        value: '',
        maxValue:100,
      }),
      Ember.Object.create({
        text: faker.finance.accountName(),
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: '', // 选项的Icon
        color:'gray',
        value: '',
        maxValue:100,
      })
    ];

    return {
      nodes: [
        {
          title: faker.finance.accountName(),
          description: faker.lorem.paragraph(),
          images: '',
          typeName: '权重题',
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
          quesType: 'weight',
          uuid: '005',
          unit:'元',
          options,
        },
      ],

      handleEvents: {

        handleOptionInput(data, option, question){
          set(option, 'value',  data);
          return true;
        },
      },

      prevButton: 'Previous',

      nextButton: 'Next',
    }
  }
});
