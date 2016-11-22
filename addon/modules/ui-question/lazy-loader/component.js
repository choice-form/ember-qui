import Component from 'ember-component'
import InViewportMixin from 'ember-in-viewport'
import layout from './template'
import computed from 'ember-computed'
import { htmlSafe } from 'ember-string'
import get from 'ember-metal/get'
import set from 'ember-metal/set'
import { scheduleOnce } from 'ember-runloop'

export default Component.extend(InViewportMixin, {
  layout,
  classNames: ['lazy-loader'],

  attributeBindings: [
    'calculatedStyle:style'
  ],

  height: computed(() => 'auto'),

  calculatedStyle: computed('height', function() {
    return htmlSafe(`height: ${get(this, 'height')};`)
  }).readOnly(),

  didInsertElement() {
    this._super(...arguments)
    set(this, 'viewportSpy', get(this, 'isSingle'))
  },

  didEnterViewport() {
    set(this, 'viewable', true)
    scheduleOnce('afterRender', this, 'applyContentHeight')
  },

  applyContentHeight() {
    const { height } = this.element.getBoundingClientRect()
    set(this, 'height', 'auto')
    set(this, 'viewportTolerance', {
      top: height + 100, bottom: height + 100, left: 0, right: 0
    })
  },

  didExitViewport() {
    set(this, 'viewable', false)
    set(this, 'height', `${this.element.getBoundingClientRect().height}px`)
  }
})
