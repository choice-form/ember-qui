import { get } from '@ember/object';
import { reads } from '@ember/object/computed';
import { scheduleOnce, later } from '@ember/runloop';
import { set } from '@ember/object';
import Component from '@ember/component';
import { device } from 'device';

import { addClass } from '../../lib/attribute-manage';
import layout from './template';

export default Component.extend({
  layout,

  classNames: ['ui-ranking'],
  attributeBindings: ['data-render-id'],
  'data-render-id': reads('node.renderId'),

  actions: {
    handleOptionClick() {
      this.handleEvents.handleOptionClick(
        get(this, 'option'),
        get(this, 'node')
      );
    },

    handleOptionInput(e) {
      set(this, 'option.value', e.target.value);
      this.handleEvents.handleOptionInput(
        get(this, 'option'),
        get(this, 'node')
      );
    },
  },

  renderSortable() {
    const options = get(this, 'options');
    const rankItems = this.element.querySelectorAll('.ranking-rank');
    options.forEach((item, index) => {
      if (item.sortNo > 0) {
        addClass(rankItems[index], 'complete');
      }
    });
    const draggableWrapper = this.element.querySelector('.ranking-wrapper');
    const draggable = new Draggable.Sortable(draggableWrapper, {
      draggable: '.ranking-rank',
      appendTo: draggableWrapper,
      mirror: {
        constrainDimensions: true,
      },
      swapAnimation: {
        duration: 200,
        easingFunction: 'ease-in-out',
      },
      plugins: [Draggable.Plugins.SwapAnimation],
      classes: {
        'source:dragging': 'ghost',
        'source:original': 'drag-origin',
        'draggable:over': 'draggable--over',
        mirror: 'chosen',
      },
    });

    draggable.on('sortable:stop', e => {
      let {
        data: { newIndex, oldIndex },
      } = e;

      if (newIndex === undefined) {
        newIndex = oldIndex;
      }

      if (newIndex === oldIndex) {
        return;
      }

      const indexArray = this.handleEvents.handleOptionDrop(
        oldIndex,
        newIndex,
        get(this, 'node')
      );

      later(() => {
        const items = this.element.querySelectorAll('.ranking-rank');
        indexArray.forEach(index => {
          const item = items[index - 1];
          item.querySelector('.ranking-number').innerHTML = index;
          addClass(item, 'complete');
        });
      });
    });
  },

  init() {
    this._super(...arguments);
    this.isDesktop = device.desktop;
  },

  didInsertElement() {
    scheduleOnce('afterRender', this, 'renderSortable');
  },
}).reopenClass({ positionalParams: ['node', 'handleEvents'] });
