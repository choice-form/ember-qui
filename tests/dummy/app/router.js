import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('faker');
  this.route('option-cell');
  this.route('svg-icon');
});

export default Router;
