import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {reads} from 'ember-computed';
import {Sortable, Plugins} from 'sortable';
import {scheduleOnce, later} from 'ember-runloop';
import {addClass} from '../../lib/attribute-manage'
import $ from 'jquery';
import device from 'device';

console.log(Sortable, Plugins);

export default Component.extend({
  layout,

  classNames: ['ui-ranking'],
  attributeBindings: ['data-render-id'],
  'data-render-id': reads('node.renderId'),

  actions: {
    handleOptionClick() {
      this.handleEvents.handleOptionClick(get(this, 'option'), get(this, 'node'));
    },

    handleOptionInput(e) {
      set(this, 'option.value', e.target.value);
      this.handleEvents.handleOptionInput(get(this, 'option'), get(this, 'node'));
    },
  },

  renderSortable() {
    const options = get(this, 'options');
    const rankItems = this.element.querySelectorAll('.ranking-rank');
    options.forEach((item, index) => {
      if (item.sortNo > 0) {
        addClass(rankItems[index], 'complete')
      }
    });
    const sortableWrapper = this.element.querySelector('.ranking-wrapper');
    const sortable = new Sortable(sortableWrapper, {
      draggable: '.ranking-rank',
      handle: '.handle',
      swapAnimation: {
        duration: 200,
        easingFunction: 'ease-in-out',
      },
      plugins: [Plugins.SwapAnimation],
      classes: {
        'source:dragging': 'ghost',
        'source:original': 'drag-origin',
        mirror: 'chosen'
      }
    });

    sortable.on('sortable:stop', (e) => {
      console.log(e);
      let {data: {newIndex, oldIndex}} = e;

      if (newIndex === undefined) {
        newIndex = oldIndex;
      }

      const indexArray = this.handleEvents.handleOptionDrop(
        oldIndex, newIndex, get(this, 'node')
      );

      later(() => {
        const items = this.element.querySelectorAll('.ranking-rank');
        indexArray.forEach(index => {
          const item = items[index - 1];
          item.querySelector('.ranking-number').innerHTML = index;
          addClass(item, 'complete');
        });
      })
    });

  },

  scrollMovie(event) {
    if (event.target.className !== 'handle') return;

    const offset = 64;
    const clientY = event.targetTouches[0].clientY;
    const winowHeight = $(window).height();
    const offsetX = offset;
    const offsetY = winowHeight - offset;

    const scrollAnimate = num => {
      const scrollTop = $('body').scrollTop;
      const scrollTime = scrollTop * 2 / winowHeight > 0.3 ? 4000 : 2000;
      $('body').animate({scrollTop: num}, scrollTime);
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

  init() {
    this._super(...arguments);
    this.isDesktop = device.desktop();
  },

  didInsertElement() {
    scheduleOnce('afterRender', this, 'renderSortable');

    if (device.desktop()) return;

    this.element.addEventListener('touchmove', this.scrollMovie, false);
    this.element.addEventListener('touchend', this.scrollStop, false);
  },

  willDestroyElement() {
    this.sortable && this.sortable.destroy();

    if (device.desktop()) return;

    this.element && this.element.removeEventListener('touchmove', this.scrollMovie, false);
    this.element && this.element.removeEventListener('touchend', this.scrollStop, false);
  }
}).reopenClass({positionalParams: ['node', 'handleEvents']});
