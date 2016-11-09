import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import computed from 'ember-computed';
import {htmlSafe} from 'ember-string';
import inject from 'ember-service/inject';

export default Component.extend({
  layout,

  uiService: inject('service/icon'),
  classNames:['ui-picture'],
  classNameBindings: ['priority'],
  priority: computed('node.quesType', 'node.textDirection', 'node.pictureSize', function () {
    const quesType = `${get(this, "node.quesType")}`;
    const textDirection = get(this, "node.textDirection");
    const pictureSize = get(this, "node.pictureSize");
    return `${quesType} ${textDirection} ${pictureSize}`
  }),

  /**
   * 设置选项的image
   */
  image: computed('option.image', function () {
    const image = get(this, 'option.image');
    if (image && image.length) {
      return htmlSafe(`<div class="attachment"><img src=${image}></div>`);
    } else return '';
  }),

  svg: computed('option.selected', 'option.icon', function () {
    return get(this, 'uiService').getOptionSvg(
      get(this, 'option.selected'), get(this, 'option.icon')
    );
  }),


  actions: {
    /**
     * click事件
     */
    handleOptionClick(){
      this.handleEvents.handleOptionClick(get(this, 'option'), get(this, 'node'));
    },

  },


}).reopenClass({positionalParams: ['node', 'option', 'handleEvents']});
