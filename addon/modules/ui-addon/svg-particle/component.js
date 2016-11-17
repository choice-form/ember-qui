import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
export default Component.extend({
  layout,
  classNames:['svg-particle'],
  values: "0;29",
  dur: "0.55s",

  renderId:computed(function () {
    return (new Date()).valueOf()* Math.random(100);
  }),
});
