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
  this.route('intro', {path: 'intro'});
  this.route('question', { path: 'q' });
  this.route('question-choice', { path: 'choice' });
  this.route('question-short-text', { path: 'short-text' });
  this.route('question-slider', { path: 'slider' });
  this.route('question-rating', { path: 'rating' });
  this.route('question-ranking', { path: 'ranking' });
  this.route('question-dropdown', { path: 'dropdown' });
});

export default Router;
