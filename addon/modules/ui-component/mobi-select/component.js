import Component from 'ember-component';
import layout from './template';
import {scheduleOnce} from 'ember-runloop';
import get from 'ember-metal/get';
import {initSelect} from '../../lib/mobile-factory';


const recoverSelected = (inst, list) => {
  // 获得上层数据选中的值列表
  const values = list.reduce((holder, item) => {
    if (get(item, 'selected')) {
      holder.push(get(item, 'text'));
    }
    return holder;
  }, []);
  // 恢复状态
  inst.setVal(values, true, false);
};


export default Component.extend({
  layout,
  tagName: 'select',
  attributeBindings: ['style', 'multiple'],
  style: 'display:none',
  multiple: true,

  selectInit(){
    initSelect(this.element, {
      onInit: (event, inst) => {
        // 需要恢复到上层数据的状态
        recoverSelected(inst, get(this, 'list'));
      },
      onSet: (event, inst) => {
        const result = get(this, 'handleSelect') && get(this, 'handleSelect')({
            resultList: inst.getVal(),
            list: get(this, 'list'),
            group: get(this, 'group'),
          }, get(this, 'node'));
        // 操作被驳回
        if (!result) {
          // 需要恢复到上层数据的状态
          recoverSelected(inst, get(this, 'list'));
        }
      }
    })
  },

  didInsertElement(){
    scheduleOnce('afterRender', this, 'selectInit');
  },

});
