import Component from '@ember/component';
import layout from './template';


export default Component.extend({
  layout,
  tagName: 'div',
  classNames: ['progress-bar'],
});

/**
 * UiProgressBarComponent
 *
 ``` javascript
 {{{ui-addon/progress-bar value='50'}}
 ```
 *
 * @class UiProgressBarComponent(进度条 --*)
 */


/**
 * @property {String} value - 进度条的百分值, 默认0， 最大100
 */
