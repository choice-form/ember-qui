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
      style: 'full-screen-cover',
      images: [
        {
          ratio: 1.50,
          natural:'/images/welcome/welcome-2.jpg',
          thumbnail:'/images/welcome/welcome-2-thumbnail.jpg',
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
