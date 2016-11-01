import Component from 'ember-component';
import layout from './template';
import computed, {alias} from 'ember-computed';
import get, {getProperties} from 'ember-metal/get'
import set from 'ember-metal/set'
import Masonry from 'masonry';
import imagesLoaded from 'imagesloaded';

export default Component.extend({
  layout,
  tagName: 'row',
  attributeBindings: ['data-render-id'],
  'data-render-id': alias('node.renderId'),

  /**
   * 将header的数据打包到一起
   */
  headerData: computed('node', function () {
    const question = get(this, 'node');
    return getProperties(question, ['title', 'description', 'images', 'isMust', 'number']);
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
    if (['dropdown', 'region', 'location', 'matrix', 'intro-page', 'end-page'].indexOf(quesType) > -1) {
      return true;
    } else {
      return false;
    }
  }),


  isPinterest: true,

  didRender(){
    const showStyle = get(this, 'node.showStyle');
    const quesType = get(this, 'node.quesType');
    if(quesType == "picture-choice"){
      this.control = this.element.getElementsByClassName('control')[0];
      imagesLoaded(this.control, () => {
        if (showStyle == 'pinterest') {
          this.newMasonry = new Masonry(this.control);
        }
        set(this, 'isLoading', false);
      });
    }
  },


  willDestroy(){
    this.newMasonry.remove(this.control);
  }


}).reopenClass({positionalParams: ['node', 'handleEvents']});
