import $ from 'jquery';
import Component from '@ember/component';

import layout from './template';

export default Component.extend({
  layout,
  classNames:['picture-wrapper'],
  reminder: 1,
  normals: null,
  others: null,
  spotList: null,
  init(){
    this._super(...arguments);
    const normals = [];
    const others = [];
    this.node.options.forEach((item) => {
      if(item.isOther){
        others.push(item);
      }else{
        normals.push(item);
      }
    });
    this.normals = normals;
    this.others = others;
  },

  didInsertElement(){
    setTimeout(() => {
      this.maintainSpot();
    }, 250);

  },

  maintainSpot(){
    const $heatMap = $(this.element).find('.heat-map');
    const ratio = $heatMap.width() / this.node.mapImgWidth;
    const spotList = this.normals.map((item) => {
      const x = item.x * ratio;
      const y = item.y * ratio;
      const height = item.height * ratio;
      const width = item.width * ratio;
      return {
        origin: item,
        color: item.color,
        text: item.text,
        x,
        y,
        height,
        width,
        style: `left:${x}px;top:${y}px;width:${width}px;height:${height}px;color:${item.color};border-color:${item.color}`
      }
    });
    this.set('spotList', spotList);
  },


  actions: {
    /**
     * click事件
     */
    handleSpotClick(spot, e){
      !this.handleEvents.handleOptionClick(spot.origin, this.node)
      && e.preventDefault();
    },
  },



}).reopenClass({positionalParams: ['node', 'handleEvents']});
