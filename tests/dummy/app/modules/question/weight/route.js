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
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: '', // 选项的Icon
        color:'rgba(56, 200, 123, 1)',
        value: 10,
      }),
      Ember.Object.create({
        text: faker.finance.accountName(),
        renderId: '4567890-0989',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: '', // 选项的Icon
        color:'rgba(156, 20, 123, 1)',
        value: 30,
      }),
      Ember.Object.create({
        text: faker.finance.accountName(),
        renderId: '4567890-0911',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: '', // 选项的Icon
        color:'rgba(96, 160, 13, 1)',
        value: 45,
      }),
      Ember.Object.create({
        text: faker.finance.accountName(),
        renderId: '4567890-0912',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: '', // 选项的Icon
        color:'rgba(100, 105, 98,1)',
        value: 70,
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
          typeName: '权重题',
          renderId: '4567yy0-0987',
          quesType: 'weight',
          uuid: '005',
          options,
        },
      ],

      handleEvents: {

        handleOptionInput(data, option, question){
          console.log(data);
          console.log(option);
          console.log(question);
          set(option, 'value',  data);
          return true;
        },
      },

      prevButton: 'Previous',

      nextButton: 'Next',
    }
  }
});
