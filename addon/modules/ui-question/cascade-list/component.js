import Component from 'ember-component';
import layout from './template';
import { reads } from 'ember-computed';
import computed from 'ember-computed';
import {tempI18n} from "../../helpers/temp-i18n";

export default Component.extend({
  layout,
  classNames: ['cascade-list-wrapper'],

  attributeBindings: ['renderId:data-render-id', 'count:data-count'],

  renderId: reads('node.renderId'),

  count: 2,

  reminder: 0,

  currentOption: null,

  state: computed('reminder', function() {
    return this.node.cascade.list.reduce((acc, item) => {
      acc[item.uuid] = item.list.filter(i => i.selected).length;
      return acc;
    }, {})
  }),

  actions: {
    handleOptionClick(cascade, option) {
      let resultList;

      if (cascade.multiple) {

        let selected = cascade.list.filter(item => {
          if(item.list){
            return item.selected && item.list.some(subItem => subItem.selected);
          }else{
            return item.selected;
          }
        });

        if (selected.indexOf(option) == -1) {
          const {mutexNumber} = option;
          if(mutexNumber === 10){
            // 排他的直接使用自己排掉其他
            selected = [option];
          }else{
            // 互斥的排掉同队及排他再加上自己
            selected = selected.filter(item => {
              return (!mutexNumber || item.mutexNumber !== mutexNumber)
              && item.mutexNumber !== 10;
            });
            selected.push(option);
          }

        } else if (!option.list) {
          // 多选二级取消选中
          selected = selected.filter(i => i !== option);
        }
        if(selected.length > cascade.max){
          this.handleEvents.handleNotification(tempI18n('UI_SelMaxLimit', cascade.max));
          return;
        }
        resultList = selected.map(item => item.text);
      } else {
        resultList = option.text;
      }

      const ok = this.handleEvents.handleOptionClick({resultList, list: cascade.list, group: cascade}, this.node);

      if(ok){
        if (option.list) {
          // 选中或取消一级选项时，并设置为当前的一级选中
          this.set('currentOption', option);
        }
        this.set('reminder', this.get('reminder') + 1);
      }

    }
  }
}).reopenClass({ positionalParams: ['node','handleEvents']});
