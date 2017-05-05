import Component from 'ember-component';
import layout from './template';
import set from 'ember-metal/set';
export default Component.extend({
  layout,
  classNames: ['ui-video-container'],

  measureRatio(video){
    const videoHeight = video.videoHeight;
    const videoWidth = video.videoWidth;
    set(this.video, 'ratio', Math.round(videoHeight/ videoWidth * 10000) / 10000);
  },

  didInsertElement(){
    this._super(...arguments);
    const video = this.element.querySelector('video');
    video.setAttribute('src', this.url);
    video.setAttribute('poster', this.poster);
    const cover = this.element.querySelector('.error-video-cover');
    plyr.setup(this.element, {
      controls: ['play-large'],
    });
    video.addEventListener('error', () => {
      cover.style.display = 'flex';
      this.element.style.pointerEvents = 'none';
      this.element.querySelector('.plyr__play-large').style.display = 'none';
      this.measureRatio(video);
    });

    video.addEventListener('loadeddata', () => {
      this.measureRatio(video);
    });

    video.addEventListener('ended', () => {
      if(this.video){
        set(this.video, 'ended', true);
      }
    });


  }
})
