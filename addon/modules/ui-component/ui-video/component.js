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
    const player = plyr.setup(this.element, {
      controls: ['play-large'],

    })[0];
    player.on('error', () => {
      cover.style.display = 'flex';
      this.element.style.pointerEvents = 'none';
      this.element.querySelector('.plyr__play-large').style.display = 'none';
    });

    player.on('ended', () => {
      if(this.video){
        this.video.ended  = true;
      }
    })

  }
})
