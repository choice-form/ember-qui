import Component from 'ember-component';
import layout from './template';
import computed, {alias} from 'ember-computed';
import get, {getProperties} from 'ember-metal/get'

export default Component.extend({
  layout,
  classNames:['row'],

  classNameBindings: ['classname'],
  classname:computed('node.quesType', function () {
    const quesType = get(this, 'node.quesType');
    if(quesType){
      return `data-${quesType}`
    }else{
      return ""
    }
  }),

  attributeBindings: ['data-render-id'],
  'data-render-id': alias('node.renderId'),

  /**
   * 将header的数据打包到一起
   */
  headerData: computed('node', function () {
    const question = get(this, 'node');
    return getProperties(question, ['title', 'description', 'images', 'isMust', 'number', 'quesType']);
  }),

  /**
   * 根据节点类型的名称，返回所需要加载的component名称
   */
  componentName: computed('node.quesType', function () {
    const optionName = get(this, 'node.quesType');
    return `ui-question/${optionName}`;
  }),

  isSpecialComponent: computed('node.quesType', function () {
    const quesType = get(this, 'node.quesType');
    if (['slide', 'dropdown', 'region', 'location', 'matrix', 'intro-page', 'end-page', 'verification', 'ranking', 'weight', 'picture-choice'].indexOf(quesType) > -1) {
      return true;
    } else {
      return false;
    }
  }),



}).reopenClass({positionalParams: ['node', 'handleEvents']});
