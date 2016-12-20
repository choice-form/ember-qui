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
      case 'positioning': return '定位中...';
      case 'location-successful': return '定位成功';
      case 'location-failed': return '定位失败';
      default: return '点击图标启动定位';
    }
  }),

  actions: {
    handleOptionClick() {
      setProperties(
        this, { svgState: 'positioning', locationState: 'positioning' }
      );

      getLocation()
        .then((position) => {
          if(position.accuracy==null){
            setProperties(
              this, { locationState: 'failed', svgState: 'location-failed' }
            );
            return;
          }
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
