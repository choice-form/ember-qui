import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { notEmpty } from '@ember/object/computed';
import { searchResult } from '../../services/auto-complete/main';
import $ from 'jquery';

export default Component.extend({
  layout,
  classNames: ['ui-auto-complete'],
  result: [],
  hasResult: notEmpty('result').readOnly(),

  virtualValue: '',

  selected: computed('value', function() {
    if (this.value == "") {
      return [];
    }

    return this.value.split(/[,，]/g)
      .map(name => {
        const item = this.completeGroups.findBy('name', name);
        return {name: item.name, icon: item.icon}
      });
  }),

  click(e) {
    if (e.target.className.indexOf('ui-auto-complete') != -1) {
      $(this.element).find('input').focus();
    }
  },

  actions: {
    search(e) {
      this.searchBy(e.target.value);
    },

    autoComplete(name) {
      this.set('virtualValue', '');
      this.$textarea.val(`${this.value ? this.value + ',' : ''}${name}`).trigger('input');
      this.closeMenu();

      $(this.element).find('input').focus();
    },

    triggerInput(e) {
      e.currentTarget = e.target;
      this.oninput(e);
    },

    handleKeyPress(v, e) {
      if (e.keyCode == 8 && e.target.value == '') {
        const value = this.value.split(/[,，]/g).slice(0, -1).join(',');
        this.$textarea.val(value).trigger('input');
      }
    },

    deleteItem(name) {
      const value = this.value.split(/[,，]/g).filter(n => n != name).join(',');
      this.$textarea.val(value).trigger('input');
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
      const {result} = searchResult(keyword, this.completeGroups, 'full', this.simpleCplt);
      this.set('result', result.filter(i => this.value.indexOf(i.name) == -1));
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
