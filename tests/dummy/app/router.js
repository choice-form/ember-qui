import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('quick-link', {path:'q'});
  this.route('single');
  this.route('contact-information', function() {
    this.route('gender');
  });
  this.route('welcome', function() {
    this.route('cover');
    this.route('full-screen-cover');
    this.route('no-cover');
  });
  this.route('question', function() {
    this.route('choice');
    this.route('end-page');
    this.route('file-upload');
    this.route('icon');
    this.route('intro-page');
    this.route('location');
    this.route('dropdown');
    this.route('ranking');
    this.route('rating');
    this.route('region');
    this.route('short-text');
    this.route('range');
    this.route('slide');
    this.route('matrix');
    this.route('weight');
    this.route('lottery');
    this.route('picture-choice', function() {
      this.route('grid');
      this.route('matrix');
      this.route('pinterest');
      this.route('superscript');
      this.route('thumbnail');
      this.route('full');
    });
    this.route('verification', function() {
      this.route('captcha');
      this.route('password');
      this.route('sms');
    });
  });
  this.route('reward', function() {
    this.route('custom');
    this.route('random');
    this.route('wechat');
  });
  this.route('icon-preview', {path:'icp'});
  this.route('notification');
  this.route('warning', function() {
    this.route('complete');
    this.route('planning');
    // NOTE: wait for https://github.com/emberjs/ember.js/issues/14650
    // this.route('error');
  });
  this.route('temp', function() {
    this.route('faker');
    this.route('test');
  });
});

export default Router;
