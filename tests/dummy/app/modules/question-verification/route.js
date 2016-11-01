import Route from 'ember-route';
import set from 'ember-metal/set';
import Ember from 'ember';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {

    let options = [];

    return {
      nodes:[
        {
          title: faker.lorem.words(),
          description: faker.lorem.paragraph(),
          images: [
            {
              natural:'/images/sample-1.jpg',
              thumbnail:'/images/sample-1-thumbnail.jpg',
            }
          ],
          typeName:'验证节点',
          renderId: '4567890-0987',
          quesType: 'verification',
          verificationType: 'message', //message, password, VCode
          uuid: '002',
          isMust:true,
          number:'3',
          options,
        }
      ],

      handleEvents: {
        handleOptionClick: (option, node) => {
          console.log(option);
          console.log(node);
          if (option.toggleProperty('selected')) {

            options.forEach((opt) => {
              if (opt != option) {
                set(opt, 'selected', false);
              }
            })
          }
        },

        handleOptionInput: (option, node) => {
          console.log(option);
          console.log(node);
        },

        handlePrevClick: () => {
          console.log('点击了上一题');
        },

        handleNextClick: () => {
          console.log('点击了下一题');
        }
      },

      prevButton: '上一题',

      nextButton: '下一题',

    }
  }
});
