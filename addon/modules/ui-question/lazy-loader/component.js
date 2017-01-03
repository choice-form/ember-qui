import Component from 'ember-component'
import InViewportMixin from 'ember-in-viewport'
import layout from './template'
import computed, { reads } from 'ember-computed'
import { htmlSafe } from 'ember-string'
import get from 'ember-metal/get'
import set, { setProperties } from 'ember-metal/set'

export default Component.extend(InViewportMixin, {
  layout,
  classNames: ['lazy-loader'],
  attributeBindings: ['style', 'data-render-id'],
  'data-render-id': reads('renderId'),

  viewable: false,
  height: computed(() => 'auto'),
  style: computed('height', function() {
    return htmlSafe(`height: ${get(this, 'height')};`)
  }).readOnly(),

  didReceiveAttrs() {
    if (!get(this, 'isSingle')) set(this, 'viewable', true)
  },

  didInsertElement() {
    this._super(...arguments)
    setProperties(this, {
      viewportRefreshRate: 500,
      viewportSpy: get(this, 'isSingle')
    })
  },

  didEnterViewport() {
    if (!get(this, 'viewable')) set(this, 'viewable', true)
    get(this, 'viewportSpy') && set(this, 'height', 'auto')
  },

  didExitViewport() {
    const { height, top, bottom } = this.element.getBoundingClientRect()
    const viewportTolerance = { top: height, bottom: height, left: 0, right: 0 }

    // top below viewport bottom or bottom over viewport top
    if (top > document.documentElement.clientHeight || bottom < 0) {
      setProperties(this, { viewable: false, height: `${height}px`, viewportTolerance })
    } else {
      setProperties(this, { viewable: true, viewportTolerance })
    }
  }
})
