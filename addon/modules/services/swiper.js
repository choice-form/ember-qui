import Service from '@ember/service';

export default Service.extend({
  registry: Object.create(null),

  register(name, instance) {
    this.registry[name] = instance;
  },

  resolve(name) {
    return this.registry[name];
  },

  refresh(name) {
    const instance = this.resolve(name);

    if (instance) {
      instance.grid && instance.grid.invalidate();
    }
  },

  resetHeight(name) {
    const instance = this.resolve(name);

    if (instance) {
      instance.applyClientHeight();
      instance.grid && instance.grid.invalidate();
    }
  }
});
