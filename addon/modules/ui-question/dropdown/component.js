import Component from '@ember/component';
import layout from './template';
import { reads } from '@ember/object/computed';

export default Component.extend({
  layout,
  classNames:['dropdown-layout'],
  attributeBindings:['data-render-id'],
  'data-render-id': reads('node.renderId'),
}).reopenClass({ positionalParams: ['node','handleEvents']});
