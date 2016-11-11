import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import inject from 'ember-service/inject';
import set from 'ember-metal/set';

export default Component.extend({
  layout,
  tagName:'',
  iconService : inject("service/icon"),

  actions: {
    /**
     * click事件
     */
    handleOptionClick(){
      this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'node'));
    },
  },


  didReceiveAttrs(){
    const iconService = get(this, 'iconService');
    const icon = iconService.getIconByUrl(get(this, 'option.icon'));
    icon.then((res)=>{
        set(this, 'svg', res);
      }
    )
  }

}).reopenClass({ positionalParams: ['node','option','handleEvents']});
