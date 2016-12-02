import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import { reads } from 'ember-computed';
import { mobiInitTreeList } from '../../lib/mobile-factory';

export default Component.extend({
  layout,
  classNames:['dropdown-layout'],
  attributeBindings:['data-render-id'],
  'data-render-id': reads('node.renderId'),

  didRender(){
    const input = this.element.getElementsByClassName('dropdown-list')[0];

    mobiInitTreeList(input, {
      placeholder: get(this, 'node.placeholder'),

      onSet: (event, inst)=>{
        this.handleEvents.handleQuestionInput(event.valueText, get(this,'node'));
        input.previousElementSibling.value = get(this, 'node.value');
      },
      onInit: () => {
        const mobiInput = input.previousElementSibling;
        mobiInput.value = get(this, 'node.value');
        mobiInput.setAttribute('class', 'ui-menu');
      }
    });
  }
}).reopenClass({ positionalParams: ['node','handleEvents']});
