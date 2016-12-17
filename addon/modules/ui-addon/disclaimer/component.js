import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import {setProperties} from 'ember-metal/set';
import inject from 'ember-service/inject';


export default Component.extend({
  layout,
  tagName: '',

  disclaimerService: inject("disclaimer"),


  isShowException : false,
  checked:true,

  actions:{
    isShowException() {
      const isShowException = !get(this,'isShowException');
      setProperties(this,{isShowException: isShowException, checked:isShowException, 'disclaimerService.disclaimer': isShowException});
    },

    handleChecked(){
      const checked = !get(this,'checked');
      setProperties(this,{checked: checked, 'disclaimerService.disclaimer': checked});
    },
  }
})
