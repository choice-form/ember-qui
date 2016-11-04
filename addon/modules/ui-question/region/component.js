import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import computed from 'ember-computed';
import {htmlSafe} from 'ember-string';
import {mobiInitTreeList} from '../../lib/mobile-factory'

export default Component.extend({
  layout,
  classNames:['ui-region'],
  attributeBindings:['data-render-id'],
  'data-render-id': computed.oneWay('node.renderId'),


  svg: htmlSafe(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
        <use xlink:href="#arrows-small-down"></use>
      </svg>`),


  didRender(){
    const input = this.element.getElementsByClassName('region-list')[0];
    mobiInitTreeList(input, {
      placeholder: get(this, 'node.placeholder'),

      /* eslint-disable no-unused-vars*/
      onSet: (event, inst)=>{

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
