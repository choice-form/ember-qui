import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { reads } from 'ember-computed';
import Sortable from 'sortable';
import { scheduleOnce, later } from 'ember-runloop';
import { addClass, removeClass } from '../../lib/attribute-manage'
import $ from 'jquery';
import device from 'device';

export default Component.extend({
  layout,

  classNames: ['ui-ranking'],
  attributeBindings: ['data-render-id'],
  'data-render-id': reads('node.renderId'),

  actions: {
    handleOptionClick(){
      this.handleEvents.handleOptionClick(get(this, 'option'), get(this,'node'));
    },

    handleOptionInput(e){
      set(this, 'option.value', e.target.value);
      this.handleEvents.handleOptionInput(get(this, 'option'), get(this,'node'));
    },
  },

  renderSortable() {
    const options = get(this, 'options');
    const rankItems = this.element.querySelectorAll('.ranking-rank');
    options.forEach((item, index)=>{
      if (item.sortNo > 0) {
        addClass(rankItems[index], 'complete')
      }
    });

    const sortableWrapper = this.element.querySelector('.ranking-wrapper');
    this.sortable = new Sortable(sortableWrapper, {
      handle: '.handle',
      scroll: false,
      scrollSensitivity: device.desktop() ? 64 : 0,
      animation: 250,
      delay: 50,
      sort: true,
      ghostClass: "ghost",
      chosenClass: "chosen",
      onEnd: event => {
        let { oldIndex, newIndex } = event;
        const newItems = this.element.querySelectorAll('.ranking-rank');

        if (newIndex === undefined) {
          newIndex = oldIndex;
        }

        const indexArray = this.handleEvents.handleOptionDrop(
          oldIndex, newIndex, get(this, 'node')
        );

        indexArray.forEach(item => {
          const sortNo = window.parseInt(item, 10);
          const index = item - 1;
          const rankItem = newItems[index];
          rankItem.querySelector('.ranking-number').innerHTML = sortNo;
          removeClass(rankItem, 'complete');
          addClass(rankItem, 'complete event');
          later(()=>{
            removeClass(rankItem, 'event');
          }, 1000);
        });
      }
    });
  },

  scrollMovie(event) {
    if (event.target.className !== 'handle') return ;

    const offset = 64;
    const clientY = event.targetTouches[0].clientY;
    const winowHeight = $(window).height();
    const offsetX = offset;
    const offsetY = winowHeight - offset;

    const scrollAnimate = num => {
      const scrollTop = $('body').scrollTop;
      const scrollTime = scrollTop * 2 / winowHeight > 0.3 ? 4000 : 2000;
      $('body').animate({ scrollTop: num }, scrollTime);
    };

    if ((clientY < offsetX) && this.isScrollUp) {
      scrollAnimate(0);
      this.isScrollUp = false;
    }

    if ((clientY > offsetY) && this.isScrollDown) {
      scrollAnimate(winowHeight);
      this.isScrollDown = false;
    }

    if ((clientY <= offsetY) && (clientY >= offsetX)
        && (!this.isScrollUp || !this.isScrollDown)) {
      $('body').stop();
      this.isScrollUp = true;
      this.isScrollDown = true;
    }
  },

  scrollStop() {
    $('body').stop();
  },

  didInsertElement(){
    scheduleOnce('afterRender', this, 'renderSortable');

    if (device.desktop()) return;

    this.element.addEventListener('touchmove', this.scrollMovie, false);
    this.element.addEventListener('touchend', this.scrollStop, false);
  },

  willDestroyElement(){
    this.sortable && this.sortable.destroy();

    if (device.desktop()) return ;

    this.element.removeEventListener('touchmove', this.scrollMovie, false);
    this.element.removeEventListener('touchend', this.scrollStop, false);
  }
}).reopenClass({ positionalParams: ['node', 'handleEvents']});
