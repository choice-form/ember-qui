import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import computed from 'ember-computed';
import {htmlSafe} from 'ember-string';


export default Component.extend({
  layout,
  classNameBindings: ['priority'],
  priority: computed('node.quesType', 'node.textDirection', 'node.pictureSize', function () {
    const quesType = `ui-${get(this, "node.quesType")}`;
    const textDirection = get(this, "node.textDirection");
    const pictureSize = get(this, "node.pictureSize");
    return `${quesType} ${textDirection} ${pictureSize}`
  }),

  /**
   * 设置选项的image
   */
  image: computed('option.image', function () {
    const image = get(this, 'option.image');
    if(image && image.length){
      return htmlSafe(`<div class="attachment"><img src=${image}></div>`);
    }else return '';
  }),


  actions: {
    /**
     * click事件
     */
    handleOptionClick(){
      this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'node'));
    },

    /**
     * change事件
     */
    handleOptionInput(e){
      const value = e.target.value;
      set(this, 'option.value', value);
      this.handleEvents.handleOptionInput(get(this, 'option'),get(this,'node'));
    },
  },


}).reopenClass({positionalParams: ['node','option', 'handleEvents']});
