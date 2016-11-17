/* eslint-disable */
import Route from 'ember-route';
import set from 'ember-metal/set';
import faker from 'faker';

export default Route.extend({
  model() {

    let options = [];

    return {
      nodes: [
        {
          title: faker.lorem.words(),
          description: faker.lorem.paragraph(),
          images: '',
          typeName: '验证节点',
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
          quesType: 'verification',
          verificationType: 'sms', //sms, password, captcha
          uuid: '002',
          isMust: true,
          number: '3',
          options,
        }
      ],

      handleEvents: {
        handleOptionClick(option, question){
          console.log(option);
          console.log(question);

          return true;
        },

        handleQuestionInput(dynamic, question){
          console.log(dynamic);
          console.log(question);

          return true;
        },

      },

      prevButton: '上一题',

      nextButton: '下一题',

    }
  }
});
