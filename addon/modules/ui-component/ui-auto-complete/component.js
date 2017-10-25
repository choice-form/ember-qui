import Component from 'ember-component';
import layout from './template';
import {htmlSafe} from 'ember-string';
import {notEmpty} from 'ember-computed';
import {searchResult} from '../../services/auto-complete/main';

export default Component.extend({
  layout,
  classNames: ['ui-auto-complete'],
  result: [],
  hasResult: notEmpty('result').readOnly(),
  $textarea: null,
  actions: {
    ipTextarea(e){
      if (e.isTrigger) {
        e.currentTarget = e.target;
      } else {
        this.searchBy(e.target.value);
      }
      this.oninput(e);
    },
    clickOption(e){
      const value = this.existed.concat(e.target.textContent).join(',');
      this.$textarea.val(value).trigger('input');
      this.closeMenu();
    }
  },

  init(){
    this._super(...arguments);
    this.captureMouseDown = this.captureMouseDown.bind(this);
  },

  captureMouseDown(e){
    if(e.target !== this.element && !this.element.contains(e.target)){
      this.closeMenu();
    }
  },

  searchBy(keyword){
    clearTimeout(this.taskId);
    this.taskId = setTimeout(()=>{
      const {result, existed} = searchResult(keyword, this.completeGroups);
      this.set('result', result);
      this.existed = existed;
    }, 250);
  },

  closeMenu(){
    this.set('result', []);
    this.existed = [];
  },

  didInsertElement(){
    this.$textarea = $(this.element).find('textarea');
    window.addEventListener('mousedown', this.captureMouseDown, true);
  },

  willDestroyElement(){
    window.removeEventListener('mousedown', this.captureMouseDown, true);
  }

});
