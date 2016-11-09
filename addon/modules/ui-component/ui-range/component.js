import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import computed,{alias} from 'ember-computed';

export default Component.extend({
  layout,
  classNames: ['ui-range'],
  attributeBindings:['data-render-id'],
  'data-render-id': computed.oneWay('node.renderId'),
  classNameBindings: ['className'],
  className: "",

  minValue: computed('option.minValue', function () {
    const minValue = get(this, 'option.minValue');
    return minValue ? minValue : 0;
  }),
  maxValue: computed('option.maxValue', function () {
    const maxValue = get(this, 'option.maxValue');
    return maxValue ? maxValue : 100;
  }),


  actions: {
    /**
     * change事件
     */
    handleOptionInput(e){
      this.handleEvents.handleOptionInput( parseInt(e), get(this, 'option'),get(this,'node'));
    },
  },

}).reopenClass({ positionalParams: ['node','option','handleEvents']});
