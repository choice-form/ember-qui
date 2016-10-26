import Component from 'ember-component';
import layout from './template';
import styles from './styles';
import computed from 'ember-computed';
import get from 'ember-metal/get'


export default Component.extend({
  layout, styles,
  tagName:'',

  /**
   * 将header的数据打包到一起
   */
  headerData:computed('control', function () {
    const question = get(this, 'control');
    return  Ember.getProperties(question, ['title', 'description', 'images']);
  }),

  /**
   * 根据节点类型的名称，返回所需要加载的component名称
   */
  componentName: computed('control.nodeType', function() {
    const optionName = get(this, 'control.nodeType');
    return `ui-question/${optionName}`;
  }),


}).reopenClass({ positionalParams: ['control', 'handleEvents'] });
