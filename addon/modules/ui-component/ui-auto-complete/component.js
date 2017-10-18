import Component from 'ember-component';
import layout from './template';
import {htmlSafe} from 'ember-string';

export default Component.extend({
  layout,
  classNames: ['ui-auto-complete'],
  $dropContainer: null,
  actions: {
    ipTextarea(e){
      if (e.isTrigger) {
        e.currentTarget = e.target;
      } else {
        this.searchResults(e.target.value);
      }
      this.oninput(e);
    },
  },

  init(){
    this._super(...arguments);
    this.captureMousedown = this.captureMousedown.bind(this);
    this.ckOption = this.ckOption.bind(this);
  },

  matchText(value, name, triggers){
    return name.toLowerCase().indexOf(value) == 0 ||
      triggers.some(trigger => trigger.toLowerCase().indexOf(value) == 0);
  },

  ckOption(e){
    if ($(e.target).hasClass('auto-text') && e.currentTarget.dataset.belong === this.elementId) {
      const value = e.target.textContent;
      const $textarea = $(this.element).find('textarea');
      $textarea.val(value).trigger('input');
      this.hideDrop();
    }
  },


  searchResults(value){
    let results = [];
    if (value) {
      value = value.toLowerCase();
      results = this.completeGroups.reduce((rs, {name, triggers}) => {
        // 拼音输入法下面输入时字母间可能有空格或'号
        const matched = this.matchText(value, name, triggers) ||
          this.matchText(value.replace(/['\s]/g, ''), name, triggers);
        matched && (rs += `<div class="auto-text">${name}</div>`);
        return rs;
      }, '');
      this.showDrop(results);
    } else {
      this.hideDrop();
    }

  },

  getDropStyle(){
    const rect = this.element.getBoundingClientRect();
    const style = {
      left: rect.left,
      width: rect.width,
    };
    const height = this.$dropContainer.height();
    console.log(height + 60, window.innerHeight - rect.bottom);

    if (height + 60 >= window.innerHeight - rect.bottom) {
      style.bottom = rect.bottom + rect.height;
    } else {
      style.top = rect.bottom;
    }
    return Object.keys(style).reduce((rs, key) => {
      return rs + `${key}:${style[key]}px;`
    }, '');
  },

  showDrop(results){
    results && this.$dropContainer.empty().append(results)
      .attr({
        style: this.getDropStyle(),
        'data-belong': this.elementId,
      })
      .show();

  },

  hideDrop(){
    this.$dropContainer.hide().empty();
  },


  initDrop(){
    let $dropContainer = $('body > .complete-list');
    if ($dropContainer.length === 0) {
      $dropContainer = $('<div class="complete-list"></div>').hide();
      $(document.body).append($dropContainer);
    }
    this.$dropContainer = $dropContainer;

    this.$dropContainer.on('click', this.ckOption);
  },

  captureMousedown(e){
    if (e.target === this.element || this.element.contains(e.target)) {
      return;
    }
    this.hideDrop();
  },

  didInsertElement(){
    window.addEventListener('click', this.captureMousedown, true);
    this.initDrop();
  },

  willDestroyElement(){
    window.removeEventListener('click', this.captureMousedown, true);
    this.$dropContainer.off('click', this.ckOption);
  },

});
