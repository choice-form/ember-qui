import Route from 'ember-route';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {
    return {
      title:faker.address.streetAddress(true),
      description: faker.lorem.paragraph(),
      images:[1,2].map(function () {
        return faker.image.image(360, 360, true)
      }),

      handleEvents: {
        handleNextClick: () => {
          console.log('点击了下一题');
        }
      },

      nextButton: "Start",
    }
  }
});
