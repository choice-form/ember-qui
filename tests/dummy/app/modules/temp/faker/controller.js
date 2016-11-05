import Controller from 'ember-controller';
import faker from 'faker';
import computed from 'ember-computed';

export default Controller.extend({
  name: faker.name.findName(),
  country: faker.address.country(),
  address: faker.address.streetAddress(true),
  email: faker.internet.exampleEmail(),
  cellphone: faker.phone.phoneNumber('###-####-####'),
  geoCode: computed(function() {
    return faker.address.latitude() + faker.address.longitude();
  }),
  recentWeek: faker.date.recent(7),
  betweenDate: faker.date.between('2016-01-01', '2016-12-31'),
  randomNumber: faker.helpers.randomize(['一', '二', '三', '四', '五']),
  shuffleNumber: faker.helpers.shuffle(['一', '二', '三', '四', '五']),
  user: faker.helpers.userCard(),
  image: faker.image.image(480, 320, true),
  avatar: faker.image.avatar(),
  paragraph: faker.lorem.paragraph(),
  randomParagraphs: faker.lorem.paragraphs(faker.random.number({min: 1, max: 3}), '\n'),
});
