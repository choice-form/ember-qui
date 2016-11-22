import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import {addClass, removeClass} from '../../lib/attribute-manage';

export default Component.extend({
  layout,
  tagName: '',

  didReceiveAttrs(){
    const isLoading = get(this,'isLoading');
    const body = document.getElementsByTagName('body')[0];
    if(isLoading){
      addClass(body, 'noscroll');
    }else{
      removeClass(body, 'noscroll')
    }
  }
});



/**
 * UiLoadingComponent
 *
 * @class UiLoadingComponent(loading -- *)
 *
 */

/**
 *
 ``` javascript
 {{ui-addon/loading isLoading=isLoading}}
 ```

 * @property {Bool} isLoading - 是否出现loading
 *
 */
