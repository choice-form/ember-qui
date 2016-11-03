import Component from 'ember-component';
import layout from './template';

/**
 * ember-cform-ui
 *
 * @class ember-cform-ui
 */

export default Component.extend({
  layout,
  tagName:'',
}).reopenClass({ positionalParams: ['question'] });
