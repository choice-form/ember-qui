import Route from 'ember-route';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {
    return {
      title: faker.lorem.words(),
      summary: faker.lorem.paragraph(),
      description: faker.lorem.paragraph(),
      images: [
        {
          natural:'/images/sample-1.jpg',
          thumbnail:'/images/sample-1-thumbnail.jpg',
        }
      ],

      handleEvents: {
        handleNextClick: () => {
          console.log('点击了下一题');
        }
      },

      nextButton: "Start",
    }
  }
});
