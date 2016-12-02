import Component from 'ember-component';
import computed from 'ember-computed';
import layout from './template';
import get from 'ember-metal/get';
import { setProperties } from 'ember-metal/set';
import { getLocation } from '../../lib/bMapApi';

export default Component.extend({
  layout,
  classNameBindings: ['typeClassName'],

  typeClassName: computed(function() {
    return `ui-${get(this, 'node.quesType')}`
  }).readOnly(),

  checked: false,

  // 状态，location、positioning、location-successful、location-failed
  svgState: 'location',

  // 'positioning' 'successful' 'failed'
  locationState: '',

  locationClassName: computed('locationState', function() {
    return `pin ${get(this, 'locationState')}`;
  }).readOnly(),

  tips: computed('svgState', function() {
    switch (get(this, 'svgState')) {
      case 'positioning': return 'Positioning...';
      case 'location-successful': return 'Successful';
      case 'location-failed': return 'Failed, Please';
      default: return 'Where are you?';
    }
  }),

  actions: {
    handleOptionClick() {
      setProperties(
        this, { svgState: 'positioning', locationState: 'positioning' }
      );

      getLocation()
        .then(position => {
          this.handleEvents.handleQuestionInput(position, get(this, 'node'));

          setProperties(
            this, { locationState: 'successful', svgState: 'location-successful' }
          );
        }).catch(() => {
          setProperties(
            this, { locationState: 'failed', svgState: 'location-failed' }
          );
      });
    },
  }
}).reopenClass({ positionalParams: ['node', 'handleEvents'] });
