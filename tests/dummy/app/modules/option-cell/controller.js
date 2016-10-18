import Controller from 'ember-controller';
import faker from 'faker';

export default Controller.extend({
  paragraph: faker.lorem.paragraph(),
  image: faker.image.image(360, 360, true),
});
