import Component from 'ember-component';
import layout from './template';
import { reads } from 'ember-computed';
import computed from 'ember-computed';

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
        resultList = cascade.list.reduce((acc, item) => {
          if (item.selected) {
            acc.push(item.text);
          }
          return acc;
        }, []);

        if (resultList.indexOf(option.text) == -1) {
          resultList.push(option.text);
        } else if (!option.list) {
          // 多选二级取消选中
          resultList = resultList.filter(i => i != option.text);
        }
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
