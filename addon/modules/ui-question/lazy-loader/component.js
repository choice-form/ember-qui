import Component from 'ember-component'
import InViewportMixin from 'ember-in-viewport'
import layout from './template'
import computed from 'ember-computed'
import { htmlSafe } from 'ember-string'
import get from 'ember-metal/get'
import set, { setProperties } from 'ember-metal/set'
import { scheduleOnce } from 'ember-runloop'

export default Component.extend(InViewportMixin, {
  layout,
  classNames: ['lazy-loader'],
  attributeBindings: ['style'],

  height: computed(() => 'auto'),

  style: computed('height', function() {
    return htmlSafe(`height: ${get(this, 'height')};`)
  }).readOnly(),

  didInsertElement() {
    this._super(...arguments)
    this.vh = document.documentElement.clientHeight
    set(this, 'viewportSpy', get(this, 'isSingle'))
  },

  didEnterViewport() {
    if (!get(this, 'viewable')) set(this, 'viewable', true)
    scheduleOnce('afterRender', this, 'applyContentHeight')
  },

  applyContentHeight() { set(this, 'height', 'auto') },

  didExitViewport() {
    const { height, top, bottom } = this.element.getBoundingClientRect()

    // top below viewport bottom or bottom over viewport top
    if (top > this.vh || bottom < 0) {
      setProperties(this, {
        viewable: false,
        height: `${height}px`,
        viewportTolerance: {
          top: height, bottom: height, left: 0, right: 0
        }
      })
    } else {
      setProperties(this, {
        viewable: true,
        viewportTolerance: {
          top: height, bottom: height, left: 0, right: 0
        }
      })
    }
  }
})
