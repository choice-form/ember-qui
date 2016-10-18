import Controller from 'ember-controller';
import faker from 'faker';

export default Controller.extend({
  address: faker.address.streetAddress(true),
  paragraph: faker.lorem.paragraph(),
  image: faker.image.image(360, 360, true),
  randomParagraphs: faker.lorem.paragraphs(faker.random.number({min: 1, max: 3}), '\n'),
});
