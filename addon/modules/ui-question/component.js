import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get'
import set from 'ember-metal/set'
import inject from 'ember-service/inject';

export default Component.extend({
  layout,
  uiService: inject('ui'),

  /**
   * 根据节点类型的名称，返回所需要加载的component名称
   */
  componentName: computed('question.nodeInfo.type', function() {
    const uiService = get(this, 'uiService');
    const optionName = uiService.getOptionComponentName(get(this, 'question.nodeInfo.type'));
    return `ui-question/${optionName}`;
  }),


  actions: {
    submit() {
      console.log(get(this, 'question'));

    }
  }
}).reopenClass({ positionalParams: ['question'] });
