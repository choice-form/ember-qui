import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import inject from 'ember-service/inject';


export default Component.extend({
  layout,
  uiService : inject('service/icon'),
  tagName:'',

  svg: computed('', 'option.icon', function () {
    const uiService = get(this, 'uiService');
    const icon = get(this, 'option.icon');
    return uiService.getOptionSvg('', icon);
  }),


  actions: {
    /**
     * click事件
     */
    handleOptionClick(){
      this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'control'));
    },

    /**
     * change事件
     */
    handleOptionInput(){
      this.handleEvents.handleOptionInput(get(this, 'option'),get(this,'control'));
    },

  },

}).reopenClass({ positionalParams: ['control','option','handleEvents']});
