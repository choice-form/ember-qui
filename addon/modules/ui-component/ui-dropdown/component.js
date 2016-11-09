import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import computed from 'ember-computed';
import {mobiInitTreeList} from '../../lib/mobile-factory'

export default Component.extend({
  layout,
  classNames:['ui-dropdown'],
  attributeBindings:['data-render-id'],
  'data-render-id': computed.oneWay('node.renderId'),


  listIcon: 'arrows-small-down',

  didRender(){
    const input = this.element.getElementsByClassName('dropdown-list')[0];
    mobiInitTreeList(input, {
      placeholder: get(this, 'node.placeholder'),

      /* eslint-disable no-unused-vars*/
      onSet: (event, inst)=>{
        this.dropDownOnSet && this.dropDownOnSet();
        this.handleEvents.handleQuestionInput(event.valueText, get(this,'node'));
        input.previousElementSibling.value = get(this, 'node.value');
      },
      onInit: () => {
        const mobiInput = input.previousElementSibling;
        mobiInput.value = get(this, 'node.value');
        //设置input的class名称
        mobiInput.setAttribute('class', 'ui-menu');
      }
    });
  }
}).reopenClass({ positionalParams: ['node','handleEvents']});
