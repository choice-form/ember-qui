import Component from 'ember-component';
import layout from './template';
import matirxSetHeight from '../../lib/matirxSetHeight';
import { reads } from 'ember-computed';
import Swiper from 'swiper';

export default Component.extend({
  layout,

  classNames: ['ui-matrix'],
  classNameBindings: ['classname'],

  attributeBindings: ['data-render-id'],
  'data-render-id': reads('node.renderId'),



  didInsertElement(){
    const fixHeader =  this.element.querySelector('.fix-header');
    const columnList = this.element.querySelector('.flickity-column');

    this.fixHeader = new Swiper(fixHeader, {
      slidesPerView: device.desktop() ? 2 : 1,
    });

    this.swiper = new Swiper(columnList, {
      slidesPerView: device.desktop() ? 2 : 1,
      paginationClickable: true,
      loop:false,
      pagination: '.swiper-pagination',
    });



    this.fixHeader.params.control = this.swiper;
    this.swiper.params.control = this.fixHeader;

    matirxSetHeight.call(this);

    if(!device.desktop()) return ;

    window.onresize =()=>{
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
