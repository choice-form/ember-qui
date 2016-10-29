import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('faker');
  this.route('icon-preview', {path:'icon-preview'});
  this.route('welcome', {path: 'welcome'});
  this.route('question-choice', { path: 'choice' });
  this.route('question-short-text', { path: 'short-text' });
  this.route('question-slider', { path: 'slider' });
  this.route('question-rating', { path: 'rating' });
  this.route('question-ranking', { path: 'ranking' });
  this.route('question-dropdown', { path: 'dropdown' });
  this.route('question-icon', { path: 'icon' });
  this.route('question-picture-choice', { path: 'picture-choice' });
  this.route('question-file-upload', { path: 'file-upload' });
  this.route('question-location', { path: 'location' });
  this.route('question-intro-page', { path: 'intro-page' });
  this.route('question-single', { path: 'single' });

});

export default Router;
