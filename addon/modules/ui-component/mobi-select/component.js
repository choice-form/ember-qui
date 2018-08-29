import Component from '@ember/component';
import layout from './template';
import { scheduleOnce } from '@ember/runloop';
import { get } from '@ember/object';
import { initSelect } from '../../lib/mobile-factory';
import { tempI18n } from "../../helpers/temp-i18n";


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
  getItem(value) {
    return this.get('list').find(item => {
      return item.text === value;
    });
  },
  selectInit() {
    let select = 'single';
    if (get(this, 'group.multiple')) {
      select = get(this, 'group.max');
    }

    const hasMutex = this.get('group.multiple') && this.get('list').some(item => !!item.mutexNumber);

    const onItemTap = hasMutex
      ? (event, inst) => {
        if (!event.selected) {
          // 未选中的进行排他检测
          const item = this.getItem(event.value);
          const {mutexNumber} = item;
          if (mutexNumber === 10) {
            // 排他的直接排掉其他使用自己
            inst.setVal(item.text);
          } else {
            // 互斥的排掉同队和排他的即可
            let tempArray = inst._tempValue.split(',');
            tempArray.forEach((v, index) => {
              tempArray[index] = v.trim();
            });
            tempArray = tempArray.filter(value => {
              const tempItem = this.getItem(value);
              return tempItem && (!mutexNumber || tempItem.mutexNumber !== mutexNumber)
                && tempItem.mutexNumber !== 10;
            });
            tempArray.push(event.value);
            // 不能超过最大项目数限制
            if (tempArray.length <= this.get('group.max')) {
              inst.setVal(tempArray.join(','))
            } else {
              const text = this.group.text;
              this.handleEvents.handleNotification(tempI18n('UI_SelMaxLimit',
                text ? tempI18n('UI_ListItem') + text : tempI18n('UI_TopList'),
                this.get('group.max')));
            }
          }
        }
      }
      : null;

    initSelect(this.element, {
      multiline: get(this, 'group.multiLine'),
      display: get(this, 'group.display'),
      select,
      onInit: (event, inst) => {
        // 需要恢复到上层数据的状态
        recoverSelected(inst, get(this, 'list'));
      },
      onItemTap,
      onSet: (event, inst) => {
        const handleEvents = get(this, 'handleEvents');
        const result = handleEvents && handleEvents.handleOptionClick({
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

  didInsertElement() {
    scheduleOnce('afterRender', this, 'selectInit');
  },

});
