import Component from '@ember/component';
import layout from './template';
import { get } from '@ember/object';
import { set } from '@ember/object';
import { reads } from '@ember/object/computed';
import { Sortable, Plugins } from 'sortable';
import { scheduleOnce, later } from '@ember/runloop';
import { addClass } from '../../lib/attribute-manage'
import device from 'device';

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
      appendTo: sortableWrapper,
      mirror: {
        constrainDimensions: true,
      },
      swapAnimation: {
        duration: 200,
        easingFunction: 'ease-in-out',
      },
      plugins: [Plugins.SwapAnimation],
      classes: {
        'source:dragging': 'ghost',
        'source:original': 'drag-origin',
        'draggable:over': 'draggable--over',
        mirror: 'chosen'
      }
    });

    sortable.on('sortable:stop', (e) => {
      let {data: {newIndex, oldIndex}} = e;

      if (newIndex === undefined) {
        newIndex = oldIndex;
      }

      if (newIndex === oldIndex) {
        return;
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

  init() {
    this._super(...arguments);
    this.isDesktop = device.desktop();
  },

  didInsertElement() {
    scheduleOnce('afterRender', this, 'renderSortable');
  },
}).reopenClass({positionalParams: ['node', 'handleEvents']});
