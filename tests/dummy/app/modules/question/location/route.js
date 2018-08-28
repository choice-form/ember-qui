import Route from '@ember/routing/route';
import { set } from '@ember/object';
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
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
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
          set(question, 'value', "上海市-上海-龙华");
          return true;
        },
      },

      prevButton: 'Previous',

      nextButton: 'Next',
    }
  }
});
