import Component from 'ember-component';
import layout from './template';
import styles from './styles';
import computed from 'ember-computed';
import get from 'ember-metal/get'
import set from 'ember-metal/set'
import inject from 'ember-service/inject';

export default Component.extend({
  layout, styles,
  tagName:'section',
  uiService: inject('ui'),

  /**
   * 将header的数据打包到一起
   */
  headerData:computed('question', function () {
    const question = get(this, 'question');
    return  Ember.getProperties(question, ['title', 'description', 'images']);
  }),

  /**
   * 将节点信息等数据打包到一起
   */
  nodeInfo:computed('question', function () {
    const question = get(this, 'question');
    return  Ember.getProperties(question, ['type', 'selectType', 'showStyle', 'id']);
  }),

  /**
   * 将button的数据打包到一起
   */
  buttonData:computed('question', function () {
    const question = get(this, 'question');
    return  Ember.getProperties(question, ['prevButton', 'nextButton']);
  }),


  /**
   * 根据节点类型的名称，返回所需要加载的component名称
   */
  componentName: computed('question.type', function() {
    const uiService = get(this, 'uiService');
    const optionName = uiService.getOptionComponentName(get(this, 'question.type'));
    return `ui-question/${optionName}`;
  }),




  actions: {
    submit() {
      console.log(get(this, 'question'));
    }
  }

}).reopenClass({ positionalParams: ['question'] });
