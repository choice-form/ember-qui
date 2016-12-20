import Route from 'ember-route';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {
    return {
      title: faker.finance.accountName(),
      description: faker.lorem.paragraph(),
      summary:faker.lorem.paragraph(),
      renderId: faker.date.between('2016-01-01', '2016-12-31'),
      style: 'no-cover',
      images: [
        {
          ratio: 0.6666667,
          natural:'/images/welcome/welcome-1.jpg',
          thumbnail:'/images/welcome/welcome-1-thumbnail.jpg',
        }
      ],

      handleEvents: {
        handleNextClick: (foo) => {
          console.log(foo);
        }
      },

      nextButton: "Start",
    }
  }
});
