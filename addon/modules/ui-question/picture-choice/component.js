import Component from 'ember-component';
import layout from './template';
import computed, { filterBy, gt } from 'ember-computed';
import get from 'ember-metal/get';
import Masonry from 'masonry';
import { scheduleOnce } from 'ember-runloop';

export default Component.extend({
  layout,
  classNames:['picture-wrapper'],

  imageOptions: filterBy('node.options', 'image', true),
  selectedImageOptions: filterBy('imageOptions', 'selected', true),
  hasSelectedImageOptions: gt('selectedImageOptions.length', 0),

  images: computed('node.options', function() {
    return get(this, 'node.options').filter(option => option.inputType.length == 0);
  }),

  openPhotoSwipe(images, trigger, options = {}) {
    let pswpElement = document.querySelector('.pswp');

    if (!options.getThumbBoundsFn) {
      options.getThumbBoundsFn = function(/*index*/) {
        let {left, top, width} = trigger.getBoundingClientRect();
        return {x: left, y: top, w: width};
      }
    }

    let items = images.map(item => ({
      src: item.image.natural,
      w: item.image.width,
      h: item.image.height
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
    },

    openPhotoSwipe(index) {
      // 开始处理 PhotoSwipe
      this.openPhotoSwipe(get(this, 'images'), event.target, {
        index,
        bgOpacity: 1,
        history: false,
        showHideOpacity: true,
      });
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
