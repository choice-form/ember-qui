import Component from 'ember-component';
import layout from './template';
import { reads } from 'ember-computed';
import computed from 'ember-computed';


export default Component.extend({
  layout,

  attributeBindings: ['renderId:data-render-id', 'count:data-count'],

  renderId: reads('node.renderId'),

  count: computed(function() {
    return Math.max(...this.node.options.map(option => option.cascadePath.split('=>').length));
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
        } else {
          resultList = resultList.filter(item => item != option.text);
        }
      } else {
        resultList = option.text;
      }

      this.handleEvents.handleOptionClick({resultList, list: cascade.list, group: cascade}, this.node);
    }
  }
}).reopenClass({ positionalParams: ['node','handleEvents']});
