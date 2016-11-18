import Route from 'ember-route';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {
    return {
      renderId: faker.date.between('2016-01-01', '2016-12-31'),
      warningType: "warning",
      level: "error",
      warningLabel: "We're sorry, this form system error occurred, please try again later.",
    }
  }
});
