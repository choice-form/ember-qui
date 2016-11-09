import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import computed, {alias} from 'ember-computed';
import inject from 'ember-service/inject';

export default Component.extend({
  layout,

  uiService: inject('service/icon'),
  classNames: ['ui-picture'],
  classNameBindings: ['class_names'],
  class_names: computed('node.showStyle', 'node.picStyle', 'node.textDirection', 'node.pictureSize', function () {
    const showStyle = get(this, 'node.showStyle');
    const picStyle = get(this, 'node.picStyle');
    const textDirection = get(this, "node.textDirection");
    const pictureSize = get(this, "node.pictureSize");
    return `${showStyle} ${picStyle} ${textDirection} ${pictureSize}`
  }),

  /**
   * 设置选项的image
   */
  image: alias("option.image"),

  svg: computed('option.selected', 'option.icon', function () {
    return get(this, 'uiService').getOptionSvg(
      get(this, 'option.selected'), get(this, 'option.icon')
    );
  }),

}).reopenClass({positionalParams: ['node', 'option']});
