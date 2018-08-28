import Controller from '@ember/controller';

export default Controller.extend({
  value: null,
  step: 0,
  min: -100,
  max: 100,
  connect: [true, true],
});
