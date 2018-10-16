import { set, computed } from '@ember/object';
import Component from '@ember/component';
import { Plyr } from '@very-geek/ember-plyr';

import layout from './template';

export default Component.extend({
  layout,

  classNames: ['ui-video-container'],

  type: computed('src', {
    get() {
      return this.url ? `video/${this.url.substr(this.url.lastIndexOf('.') + 1)}` : '';
    },
  }),

  didInsertElement() {
    const video = this.element.querySelector('video');
    const cover = this.element.querySelector('.error-video-cover');

    // NOTE: use Plyr instead of primitive HTML5 video
    // video.setAttribute('src', this.url);
    // video.setAttribute('poster', this.poster);

    const instance = new Plyr(video, { controls: ['play-large'] });

    instance.on('error', () => {
      cover.style.display = 'flex';
      this.element.style.pointerEvents = 'none';
      this.element.querySelector('.plyr__play-large').style.display = 'none';
      this.measureRatio(video);
    });

    instance.on('loadeddata', () => {
      this.measureRatio(video);
    });

    instance.on('ended', () => {
      set(this.video, 'ended', true);
    });
  },

  measureRatio(video) {
    const { videoHeight, videoWidth } = video;
    const ratio = Math.round((videoHeight / videoWidth) * 10000) / 10000;
    set(this.video, 'ratio', ratio);
  },
});
