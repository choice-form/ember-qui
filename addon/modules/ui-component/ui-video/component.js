import { set, computed } from '@ember/object';
import Component from '@ember/component';
import { Plyr } from '@very-geek/ember-plyr';

import layout from './template';

export default Component.extend({

  layout,

  classNames: ['ui-video-container'],

  type: computed('src', {
    get() {
      return this.src ? `video/${this.src.split('.')[1]}` : '';
    }
  }),

  didInsertElement(){
    const video = this.element.querySelector('video');
    const cover = this.element.querySelector('.error-video-cover');

    // video.setAttribute('src', this.url);
    // video.setAttribute('poster', this.poster);

    const instance = new Plyr(video, { controls: ['play-large'] });

    instance.on('error', () => {
      cover.style.display = 'flex';
      this.element.style.pointerEvents = 'none';
      this.element.querySelector('.plyr__play-large').style.display = 'none';
      this.measureRatio(this.video);
    });

    instance.on('loadeddata', () => {
      this.measureRatio(this.video);
    });

    instance.on('ended', () => {
      set(this.video, 'ended', true);
    });
  },

  measureRatio(video){
    const { videoHeight, videoWidth } = video;
    const ratio = Math.round(videoHeight/ videoWidth * 10000) / 10000;
    set(this.video, 'ratio', ratio);
  },

});
