import Controller from 'ember-controller';
import faker from 'faker';
export default Controller.extend({

  header:{
    questionText:faker.address.streetAddress(true),
    questionDescribe: faker.lorem.paragraph(),
    images:[1].map(function () {
      return faker.image.image(360, 360, true)
    }),
    typeName:'选择题',
  }
});
