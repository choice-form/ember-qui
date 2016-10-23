import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('faker');
  this.route('option-cell');
  this.route('svgicon', {path:'svg'});
  this.route('header', {path: 'h'});
  this.route('button', {path: 'b'});
  this.route('question', { path: 'q' });
  this.route('options-select', { path: 'select' });
  this.route('options-fill', { path: 'fill' });

});

export default Router;
