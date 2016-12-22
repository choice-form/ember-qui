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

  tips : '点击获取位置信息',

  actions: {
    handleOptionClick() {

      setProperties(
        this, { svgState: 'positioning', locationState: 'positioning', tips:'正在获取位置信息...'}
      );

      const that = this;
      navigator.geolocation.getCurrentPosition(function() {
        getLocation()
          .then((position) => {
            that.handleEvents.handleQuestionInput(position, get(that, 'node'));
            setProperties(
              that, { locationState: 'successful', svgState: 'location-successful' ,tips:'成功获取位置信息'}
            );
          }).catch(() => {
          setProperties(
            that, { locationState: 'failed', svgState: 'location-failed' , tips:'定位失败!'}
          );
        });
      }, (data)=>{
        setProperties(
          that, { locationState: 'failed', svgState: 'location-failed', tips: data.code == '1' ? '请开启定位服务!' : '定位超时，请使用GPS定位!'}
        );
      },{
        timeout: 10000
      });
    },
  }
}).reopenClass({ positionalParams: ['node', 'handleEvents'] });
