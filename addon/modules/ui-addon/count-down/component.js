import Component from 'ember-component';
import layout from './template';


export default Component.extend({
  layout,
  tagName: 'div',
  classNames: ['count-down'],
});


/**
 * UiCutDownComponent
 *
 ``` javascript
 {{ui-addon/count-down value='04:45'}}
 ```
 *
 * @class UiCutDownComponent
 */


/**
 * @property {String} value - 计时器值
 */

