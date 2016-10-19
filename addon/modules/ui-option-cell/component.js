import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {isPresent} from 'ember-utils';
import {htmlSafe} from 'ember-string';
import nodeTypes  from 'ember-cform-ui/modules/emun/component';


export default Component.extend({
  layout,
  selected: false,
  thisSelected : computed('selected', function () {
    return get(this, 'selected');
  }),

  checkedClass: computed('checked', function () {
    return get(this, 'checked') ? 'checked' : 'unchecked';
  }),

  errorMessage: computed('subject.error', 'error', function () {
    const error = get(this, 'subject.error') || get(this, 'error');
    if (isPresent(error)) {
      return htmlSafe(`<div class="error-message>${error}</div>`);
    } else return '';
  }),

  img: null,
  picture: computed('img', function () {
    const img = get(this, 'img');
    return img ? htmlSafe(`<img src="${img}">`) : null;
  }),

  nodeType: null,
  color:null,
  svg: computed('nodeType', 'thisSelected', function () {
    const nodeType = get(this, 'nodeType');
    const thisSelected = get(this, 'thisSelected');
    if (nodeType === nodeTypes['SELECTE_SINGLE']) {
      return thisSelected ? '#svg-folder-fill' : '#svg-folder';
    }
    if (nodeType === nodeTypes['SELECTE_MULTI']) {
      return thisSelected ? '#arrows-16px-1_download' : '#arrows-16px-1_fullscreen-double-74';
    }
  }),

  type: computed('nodeType', function () {
    const nodeType = get(this, 'nodeType');
    if (nodeType === nodeTypes['SELECTE_SINGLE']) {
      return 'radio'
    }
    if (nodeType === nodeTypes['SELECTE_MULTI']) {
      return 'checkbox'
    }
  }),

  //todo : 不知道为什么点击的时候回出发2次。愁。。。
  actions:{
    handClick: function (e) {
      e = e || window.event;
      if(e.stopPropagation) { //W3C阻止冒泡方法
        e.stopPropagation();
      } else {
        e.cancelBubble = true; //IE阻止冒泡方法
      }
      const thisSelected = get(this, 'thisSelected');
      console.log(thisSelected);
      set(this,'thisSelected', true);
      console.info('这里是点击的回调方法');
    }
  },


  didInsertElement() {
    const input = this.element.querySelector('input');
    const label = this.element.querySelector('label');
    const picture = this.element.querySelector('img');
    label.setAttribute('for', input.id);
    this.element.classList.add('ui-option-cell');
  }
});
