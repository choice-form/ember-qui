import Component from '@ember/component';
import layout from './template';
import { computed, get, set } from '@ember/object';
import Masonry from 'masonry';
import { scheduleOnce } from '@ember/runloop';

export default Component.extend({
  layout,
  classNames:['picture-wrapper'],
  hasSelectedImages: false,
  images: computed('node.options', function() {
    return get(this, 'node.options').filter(option => option.inputType.length === 0);
  }),

  init(){
    this._super(...arguments);
    this.updateHasSelected();
  },

  updateHasSelected(){
    const hasSelected = get(this, 'node.options').some((opt) => {
      return get(opt, 'selected');
    });
    set(this, 'hasSelectedImages', hasSelected);
  },

  openPhotoSwipe(images, trigger, options = {}) {
    let pswpElement = document.querySelector('.pswp');

    if (!options.getThumbBoundsFn) {
      options.getThumbBoundsFn = function(/*index*/) {
        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
        let {left, top, width} = trigger.getBoundingClientRect();
        return {x: left, y: top + pageYScroll, w: width};
      }
    }

    let items = images.map(item => ({
      msrc: item.image.natural,
      src: item.image.large,
      w: item.image.width,
      h: item.image.height,
      title: item.text
    }));

    this.photoSwiper = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    this.photoSwiper.init();
  },

  actions: {
    /**
     * click事件
     */
    handleOptionClick(option, e){
      !this.handleEvents.handleOptionClick(option, get(this, 'node'))
      && e.preventDefault();
      this.updateHasSelected();
    },

    openPhotoSwipe(index) {
      if (get(this, 'node.optImgScale')) {
        this.openPhotoSwipe(get(this, 'images'), event.target.parentNode.querySelector('img'), {
          index,
          tapToClose: true,
          bgOpacity: 1,
          history: false,
          showHideOpacity: get(this, 'node.objectFit') === 'cover',
          shareEl: false,
          fullscreenEl: false,
        });
      }
    }
  },

  picNewMasonry(){
    const element = this.element.getElementsByClassName('picture-layout')[0];
    this.newMasonry = new Masonry(element);
  },

  didInsertElement() {
    const showStyle = get(this, 'node.showStyle');
    if (showStyle == 'pinterest') {
      scheduleOnce('afterRender',this,'picNewMasonry');
    }
  },


  willDestroy(){
    this.newMasonry && this.newMasonry.remove(this.element);
  }


}).reopenClass({positionalParams: ['node', 'handleEvents']});
