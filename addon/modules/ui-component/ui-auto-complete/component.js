import Component from 'ember-component';
import layout from './template';
import computed, {reads} from 'ember-computed';
import {htmlSafe} from 'ember-string';

export default Component.extend({
  layout,
  classNames: ['ui-auto-complete'],
  hasResult: computed('results', function () {
    return this.get('results.length') > 0;
  }),
  results: [],
  actions: {
    ipTextarea(e){
      if (e.isTrigger) {
        e.currentTarget = e.target;
      } else {
        this.searchResults(e.target.value);
      }
      this.oninput(e);
    },
    ckOption(e){
      const value = e.target.textContent;
      console.log(value);
      const $textarea = $(this.element).find('textarea');
      $textarea.val(value).trigger('input');
      this.set('results', []);
    },
  },

  init(){
    this._super(...arguments);
    this.captureMousedown = this.captureMousedown.bind(this);
  },

  matchText(value, name, triggers){
    return name.toLowerCase().indexOf(value) == 0 ||
    triggers.some(trigger => trigger.toLowerCase().indexOf(value) == 0);
  },


  searchResults(value){
    let results = [];
    if (value) {
      value = value.toLowerCase();
      results = this.completeGroups.reduce((rs, {name, triggers}) => {
        // 拼音输入法下面输入时字母间可能有空格或'号
        const matched = this.matchText(value, name, triggers) ||
            this.matchText(value.replace(/['\s]/g, ''), name, triggers);
        matched && rs.push(name);
        return rs;
      }, []);
    }

    this.set('results', results);
  },

  captureMousedown(e){
    if(e.target === this.element || this.element.contains(e.target)){
      return;
    }
    this.set('results', []);
  },

  didInsertElement(){
    window.addEventListener('click', this.captureMousedown, true);
  },

  willDestroyElement(){
    window.removeEventListener('click', this.captureMousedown, true);
  },

});
