import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {isPresent} from 'ember-utils';
import {htmlSafe} from 'ember-string';
import inject from 'ember-service/inject';

export default Component.extend({
  layout,
  tagName: '',
  uiService: inject('ui'),
  /**
   * 设置选项的svg icon
   */
  svg: computed('option.selected', 'option.icon', function () {
    const uiService = get(this, 'uiService');
    const selected = get(this, 'option.selected');
    const icon = get(this, 'option.icon');
    return uiService.getOptionSvg(selected, icon);
  }),

  /**
   * 设置选项的image
   */
  image: computed('option.images', function () {
    const image = get(this, 'option.images');
    if(image && image.length){
      return htmlSafe(`<div class="attachment"><img src=${image}/></div>`);
    }else return '';
  }),

  didInsertElement() {
  }
}).reopenClass({positionalParams: ['option']});
