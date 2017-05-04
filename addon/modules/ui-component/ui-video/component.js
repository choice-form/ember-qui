import Component from 'ember-component';
import layout from './template';

export default Component.extend({
  layout,
  classNames: ['ui-video-container'],
  didInsertElement(){
    this._super(...arguments);
    const video = this.element.querySelector('video');
    video.setAttribute('src', this.url);
    video.setAttribute('poster', this.poster);
    const cover = this.element.querySelector('.error-video-cover');
    plyr.setup(this.element);
    video.addEventListener('error', () => {
      cover.style.display = 'flex';
      this.element.style.pointerEvents = 'none';
    });
  }
})
