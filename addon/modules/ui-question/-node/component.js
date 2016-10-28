import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get, {getProperties} from 'ember-metal/get'


export default Component.extend({
  layout,
  tagName:'',

  /**
   * 将header的数据打包到一起
   */
  headerData:computed('node', function () {
    const question = get(this, 'node');
    return  getProperties(question, ['title', 'description', 'images', 'isMust', 'number']);
  }),

  /**
   * 根据节点类型的名称，返回所需要加载的component名称
   */
  componentName: computed('node.quesType', function() {
    const optionName = get(this, 'node.quesType');
    return `ui-question/${optionName}`;
  }),

  isSpecialComponent : computed('node.quesType', function() {
    const quesType = get(this, 'node.quesType');
    console.log(['dropdown', 'location', 'matrix'].includes(quesType));
    if(['dropdown', 'location', 'matrix'].includes(quesType)){
      return true;
    }else{
      return false;
    }
  }),

}).reopenClass({ positionalParams: ['node', 'handleEvents'] });
