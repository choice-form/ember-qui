import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';

export default Component.extend({
  layout,
  tagName:'',

  actions: {

    /**
     * change事件
     */
    handleOptionInput(e){
      this.handleEvents.handleOptionInput( parseInt(e), get(this, 'option'),get(this,'node'));
    },
  },


}).reopenClass({ positionalParams: ['node','option','handleEvents']});
