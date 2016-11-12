import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed from 'ember-computed';
import {htmlSafe} from 'ember-string';

import $ from 'jquery';


export default Component.extend({
  layout,

  classNameBindings: ['classname'],
  classNames: ['ui-matrix'],

  attributeBindings: ['data-render-id'],
  'data-render-id': computed.oneWay('node.renderId'),

  actions: {

    handleOptionClick(option){
      this.handleEvents.handleOptionClick(option, get(this, 'node'));
    },

    handleOptionInput(e){
      const value = e.target.value;
      set(this, 'option.value', value);
      this.handleEvents.handleOptionInput(get(this, 'option'), get(this, 'node'));
    },
  },

  didRender(){
    const flickityColumn = this.element.getElementsByClassName('flickity-column')[0];
    const fixHeader = this.element.getElementsByClassName('fix-header')[0];

    var mySwiper = new Swiper (flickityColumn, {
      // Optional parameters
      direction: 'vertical',
      loop: true
    });

    /*this.colSlick = $(flickityColumn).slick({
      infinite: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      asNavFor: fixHeader,
      dots: true,
    });
    this.headerSlick = $(fixHeader).slick({
      infinite: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      asNavFor: flickityColumn,
      arrows: false,
    });

    /!**
     * 设置fixheader的高度
     * @type {any}
     *!/
    const fixHeaderColumns = this.element.getElementsByClassName('fix-header-column');
    let maxHeightForHeader = 0;
    for (let i = 0; i < fixHeaderColumns.length; i++) {
      if (fixHeaderColumns[i].offsetHeight > maxHeightForHeader) {
        maxHeightForHeader = fixHeaderColumns[i].offsetHeight;
      }
    }
    ;
    $(fixHeaderColumns).css('height', maxHeightForHeader + 'px');

    /!**
     * 设置colmun的高度
     * @type {any}
     *!/

    const fixColumns = this.element.getElementsByClassName('fix-column')[0].getElementsByTagName('li');
    let colHeights = [];

    for (let j = 0; j < fixColumns.length; j++) {
      colHeights[j] = fixColumns[j].offsetHeight;
    }
    ;

    const columns = this.element.getElementsByClassName('column');
    for (let k = 0; k < columns.length; k++) {
      const columnItems = columns[k].getElementsByClassName('column-item');
      for (var l = 0; l < colHeights.length; l++) {
        columnItems[l].style.height = colHeights[l] + 'px';
      }
    }
    ;*/
  },

  didDestroyElement(){
    //清楚slick缓存
    this.colSlick.slick('unslick');
    this.headerSlick.slick('unslick');
  }

}).reopenClass({positionalParams: ['node', 'handleEvents']});
