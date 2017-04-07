import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import { reads } from 'ember-computed';
import { initSelect } from '../../lib/mobile-factory';

export default Component.extend({
  layout,
  classNames:['dropdown-layout'],
  attributeBindings:['data-render-id'],
  'data-render-id': reads('node.renderId'),

  didRender(){
    console.log('render');
    const list = $(this.element).find('.dropdown-list')[0];

    initSelect(list, {

    })
  }
}).reopenClass({ positionalParams: ['node','handleEvents']});
