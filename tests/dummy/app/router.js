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
  this.route('question-file-upload', { path: 'file-upload' });
  this.route('question-location', { path: 'location' });
  this.route('question-region', { path: 'region' });
  this.route('question-intro-page', { path: 'intro-page' });
  this.route('question-end-page', { path: 'end-page' });
  this.route('question-single', { path: 'single' });
  this.route('question-picture-choice-vertical', { path: 'picture-vertical' });
  this.route('question-picture-choice-grid', { path: 'picture-grid' });
  this.route('question-picture-choice-matrix', { path: 'picture-matrix' });
  this.route('question-picture-choice-pinterest', { path: 'picture-pinterest' });
  this.route('question-picture-superscript', { path: 'picture-superscript' });
  this.route('question-verification', { path: 'verification-message' });
  this.route('test');
});

export default Router;
