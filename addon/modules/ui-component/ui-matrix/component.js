import Component from 'ember-component';
import layout from './template';
import matirxSetHeight, {swiperHeaderInit, swiperMatrixInit} from '../../lib/matirx-factory';
import computed, {reads} from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import device from 'device';
import $ from 'jquery';
import {scheduleOnce, later} from 'ember-runloop';

export default Component.extend({
  layout,

  classNames: ['ui-matrix'],
  classNameBindings: ['classname'],

  attributeBindings: ['data-render-id'],
  'data-render-id': reads('node.renderId'),

  isDesktop: computed(function () {

    return device.desktop() ? true : false;
  }),

  resizeIcon: 'stretch',


  swiperEffect(slidesNum){
    const fixHeader = this.element.querySelector('.fix-header');
    const columnList = this.element.querySelector('.column-container');
    const matrixThumbnails = $(this.element.querySelector('.matrix-thumbnail-wrapper')).find('ul');

    this.fixHeader = swiperHeaderInit(fixHeader, {
      slidesPerView: slidesNum,
    });

    this.swiper = swiperMatrixInit(columnList, matrixThumbnails, {
      slidesPerView: slidesNum,
    },()=>{
      matirxSetHeight.call(this);
    });
    this.swiper.update(true);
    this.swiper.params.control = this.fixHeader;
  },

  actions: {
    matrixResize: function () {
      const resizeIcon = get(this, 'resizeIcon');
      this.swiper.destroy(true, true);
      this.fixHeader.destroy(true, true);


      if (resizeIcon == 'stretch') {
        set(this, 'resizeIcon', 'pinch');
        later(()=>{
          this.swiperEffect(4);
        }, 100);
      } else {
        set(this, 'resizeIcon', 'stretch');
        later(()=>{
          this.swiperEffect(device.desktop() ? 2 : 1);
        },100)
      }
    },
  },


  didInsertElement(){

    later(()=>{
      scheduleOnce('afterRender',this,'swiperEffect', device.desktop() ? 2 : 1);
    },1000);



    //this.swiperEffect(fixHeader, columnList, matrixThumbnails, device.desktop() ? 2 : 1);



    if (!device.desktop()) return;

    window.onresize = ()=> {
      matirxSetHeight.call(this);
    };

  },

  willDestroyElement(){
    this.swiper.destroy(true, true);
    this.fixHeader.destroy(true, true);
  }
})


/**
 * ui-matrix
 *
 ``` javascript
 {{ui-component/ui-matrix name= node.renderId
                          otherOptions=node.otherOptions
                          matrix=node.matrix
                          optionsY=node.optionsY
                          optionsX=node.optionsX
                          handleOptionClick=(action "handleOptionClick")
                          handleOptionInput=(action "handleOptionInput")
                          handleOptionInputForTextarea=(action "handleOptionInputForTextarea")
 }}
 ```
 *
 * @class ui-matrix
 */


/**
 * @property {Array} optionsX - 矩阵模块的header数据
 * @example
 ``` javascript
 {{#each node.optionsX as |option|}}
 <div class="fix-header-column swiper-slide">
 <span>{{option.text}}</span>
 </div>
 {{/each}}
 ```
 */

/**
 * @property {Array} optionsY - 矩阵模块的左侧栏数据
 * @example
 ``` javascript
 {{#each node.optionsY as |option| }}
 <li style={{colHeight}}>
 <span>{{option.text}}</span>
 </li>
 {{/each}}
 ```
 */

/**
 * @property {Array} matrix - 矩阵模块的主体选项部分
 *
 * @example
 ``` javascript
 {{#each node.matrix as |subMatrix|}}
 <div class="column swiper-slide">
 {{#each subMatrix as |option|}}
 <div class="column-item">
 <input
 name={{node.renderId}}
 id={{option.renderId}}
 type="checkbox"
 onclick={{action 'handleOptionClick' option}}
 checked={{option.selected}}
 disabled={{disabled}}
 required>
 {{ui-component/ui-label selected=option.selected
                         for=option.renderId
                         icon=(if option.selected 'checkbox-active' 'checkbox')}}
 </div>
 {{/each}}
 </div>
 {{/each}}
 ```
 */


/**
 * @property {Array} otherOptions - 是否有其他选项
 * @example
 ``` javascript
 {#each node.otherOptions as |option|}}
 {{ui-component/ui-text inputRule=option.inputRule
                        placeholder=option.placeholder
                        value=option.value
                        handleOptionInput=(action "handleOptionInput")
                        handleOptionInputForTextarea=(action "handleOptionInputForTextarea")
 }}
 {{/each}}
 ```
 */

/**
 * @property {String} name - input的name属性 #example: name= node.renderId
 */


/**
 * @method handleOptionClick
 *
 * @param {Object} option 当前选择的选项
 * @param {Object} node 当前题型的数据对象
 *
 * @example
 ```javascript
 handleOptionClick(){
      const inputType = get(this, 'option.inputType');
      if (inputType === 'input')return;
      this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'node'));
    },
 ```
 */

/**
 * @method handleOptionInput
 *
 * @param {Object,String} value 当前input所得到的value
 * @param {Object} option 当前选择的选项
 * @param {Object} node 当前题型的数据对象
 *
 * @example
 ```javascript
 handleOptionInput(e){
      const value = e.currentTarget.value;
      this.handleEvents.handleOptionInput(value, get(this, 'option'), get(this, 'node'));
    },
 ```
 */

/**
 * @method handleOptionInputForTextarea
 *
 * @param {Object,String} value 当前input所得到的value
 * @param {Object} option 当前选择的选项
 * @param {Object} node 当前题型的数据对象
 *
 * @example
 ```javascript
 handleOptionInputForTextarea(e){
      const value = e.currentTarget.value;
      this.handleEvents.handleOptionInput(value, get(this, 'option'), get(this, 'node'));

      e.currentTarget.style.height = '74px';
      e.currentTarget.style.height = e.currentTarget.scrollHeight + 2 + 'px';

    },
 ```
 */
