import Route from 'ember-route';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {
    return {
      title: faker.finance.accountName(),
      summary: faker.lorem.paragraph(),
      description: '',
      renderId: faker.date.between('2016-01-01', '2016-12-31'),
      images: '',
      defaultImage: '/images/sample-1-thumbnail.jpg',

      handleEvents: {
        handleNextClick: (foo) => {
          console.log(foo);
        }
      },

      nextButton: "Start",
    }
  }
});
