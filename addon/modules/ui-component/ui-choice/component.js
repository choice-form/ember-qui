import Component from 'ember-component';
import layout from './template';

export default Component.extend({
  layout,
  tagName:'',


}).reopenClass({positionalParams: ['node', 'option', 'handleEvents']});

/**
 * ui-choice
 *
 * @class ui-choice
 */


/**
 * @property {Object} node - 问卷的的基本数据
 */

/**
 * @property {Object} option - 问卷的选项数据
 */
