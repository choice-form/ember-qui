import Component from 'ember-component';
import computed from 'ember-computed';
import layout from './template';
import get from 'ember-metal/get';
import {setProperties} from 'ember-metal/set';
import {getLocation} from '../../lib/bMapApi';

export default Component.extend({
  layout,
  classNameBindings: ['typeClassName'],

  typeClassName: computed(function () {
    return `ui-${get(this, 'node.quesType')}`
  }).readOnly(),

  checked: false,

  // 状态，location、positioning、location-successful、location-failed
  svgState: computed('node.value', function () {
    const value = get(this, 'node.value');
    return value ? 'location-successful' : 'location';
  }),

  // 'positioning' 'successful' 'failed'
  locationState: '',

  locationClassName: computed('locationState', function () {
    return `pin ${get(this, 'locationState')}`;
  }).readOnly(),

  tips: computed('node.value', function () {
    const value = get(this, 'node.value');
    return value ? '定位成功' : '点击获取位置信息';
  }),

  _handlePositionSuccess(position) {
    if(!position.address.city){
      setProperties(this, {locationState: 'failed', svgState: 'location-failed', tips: '定位失败!'});
      return ;
    }
    this.handleEvents.handleQuestionInput(position, get(this, 'node'));
    setProperties(
      this, {locationState: 'successful', svgState: 'location-successful', tips: '成功获取位置信息'}
    );
  },

  _handlePositionError() {
    setProperties(this, {
      locationState: 'failed',
      svgState: 'location-failed',
      tips: '定位失败!'
    });
  },

  actions: {
    handleOptionClick() {
      setProperties(
        this, {svgState: 'positioning', locationState: 'positioning', tips: '正在获取位置信息...'}
      );
      if(localStorage.getItem('allow_locate') || window.confirm('是否允许使用定位?')){
        localStorage.setItem('allow_locate', 1);
        getLocation()
          .then((position) => this._handlePositionSuccess(position))
          .catch(() => this._handlePositionError())
      }else{
        this._handlePositionError();
      }

    },
  }
}).reopenClass({positionalParams: ['node', 'handleEvents']});
