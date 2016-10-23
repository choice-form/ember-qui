import Route from 'ember-route';
import faker from 'faker';
export default Route.extend({
  model(){
    return {
      title:faker.address.streetAddress(true),
      description: faker.lorem.paragraph(),
      images:[1].map(function () {
        return faker.image.image(360, 360, true)
      }),
      typeName:'选择题',
    }
  }
});
