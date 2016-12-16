import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set,{setProperties} from 'ember-metal/set';
import inject from 'ember-service/inject';


export default Component.extend({
  layout,
  tagName: '',

  disclaimerService: inject("disclaimer"),


  isShowException : false,
  checked:false,

  actions:{
    isShowException() {
      const disclaimerService = get(this, 'disclaimerService');
      const isShowException = !get(this,'isShowException');
      setProperties(this,{isShowException: isShowException, checked:isShowException, 'disclaimerService.disclaimer': isShowException});
    },

    handleChecked(){
      const disclaimerService = get(this, 'disclaimerService');
      const checked = !get(this,'checked');
      setProperties(this,{checked: checked, 'disclaimerService.disclaimer': checked});
    },
  }
})
