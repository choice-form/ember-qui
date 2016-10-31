import Component from 'ember-component';
import computed from 'ember-computed';
import layout from './template';
import {htmlSafe} from 'ember-string';
import get from 'ember-metal/get';
import set from 'ember-metal/set';



export default Component.extend({
  layout,

  checked: false,

  tagName:'',


  //状态，location、positioning、location-successful、location-failed
  svgState : 'location',

  // '' 'positioning' 'successful' 'failed'
  locationState: '',

  svg: computed('svgState', function () {
    const icon = get(this, 'svgState');

    return htmlSafe(`<svg style="display:block" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
        <use xlink:href=#${icon}></use>
      </svg>`);
  }),


  tips: computed('svgState', function () {
  const state = get(this, 'svgState');
  if(state === 'positioning'){
    return '正在定位';
  }
  if(state === 'location-successful'){
    return "定位成功";
  }
  if(state === 'location-failed'){
    return "定位失败";
  }
  return "点击图标启动定位";
}),



  actions: {
    /**
     * click事件
     */
    handleOptionClick(){
      //todo: 仅供测试
      set(this, 'svgState', 'positioning');
      set(this, 'locationState', 'positioning');
      const that = this;
      setTimeout(function () {
        if(Math.random()*10 > 5){
          set(that, 'svgState', 'location-successful');
          set(that, 'locationState', 'successful');
        }else{
          set(that, 'locationState', 'failed');
          set(that, 'svgState', 'location-failed');
        }
      },2000);

      //this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'node'));
    },
  },

}).reopenClass({ positionalParams: ['node','option','handleEvents']});
