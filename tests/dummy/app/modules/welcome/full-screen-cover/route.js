import Route from '@ember/routing/route';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {
    return {
      title: faker.finance.accountName(),
      description: faker.lorem.paragraph(),
      summary:faker.lorem.paragraph(),
      renderId: faker.date.between('2016-01-01', '2016-12-31'),
      images: [
        {
          ratio: 1.50,
          natural:'/images/welcome/welcome-2.jpg',
          thumbnail:'/images/welcome/welcome-2-thumbnail.jpg',
        }
      ],

      bgImageMode: false,

      handleEvents: {
        handleNextClick: (foo) => {
          console.log(foo);
        }
      },

      nextButton: "Start",
    }
  }
});
