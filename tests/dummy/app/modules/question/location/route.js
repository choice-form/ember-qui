import Route from 'ember-route';
import set from 'ember-metal/set';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {
    return {
      nodes: [
        {
          title: faker.lorem.sentences(),
          description: faker.lorem.paragraph(),
          images: '',
          renderId: '775519',
          typeName: '定位题',
          quesType: 'location', //select, fill
          value: '',
          selectType: '',
          uuid: faker.date.between('2016-01-01', '2016-12-31'),
          isMust: true,
          number: '1',
          options: [],
        },
      ],

      handleEvents: {
        handleQuestionInput(dynamic, question){

          console.log(dynamic);
          set(question, 'value', "shanghai");
          return true;
        },
      },

      prevButton: 'Previous',

      nextButton: 'Next',
    }
  }
});
