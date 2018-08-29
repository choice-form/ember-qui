import Component from '@ember/component';
import layout from './template';
import { get } from '@ember/object';
import { setProperties } from '@ember/object';
import { inject } from '@ember/service';


export default Component.extend({
  layout,
  tagName: '',

  disclaimerService: inject("disclaimer"),


  isShowException : false,
  checked:true,

  actions:{
    isShowException() {
      const isShowException = !get(this,'isShowException');
      setProperties(this,{isShowException: isShowException, checked:true, 'disclaimerService.disclaimer': true});
    },

    handleChecked(){
      const checked = !get(this,'checked');
      setProperties(this,{checked: checked, 'disclaimerService.disclaimer': checked});
    },
  }
})
