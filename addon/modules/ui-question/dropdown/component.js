import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed from 'ember-computed';
import {htmlSafe} from 'ember-string';
import {mobiInitTreeList} from '../../lib/mobile-factory'

export default Component.extend({
  layout,
  classNames:['ui-dropdown'],
  attributeBindings:['data-render-id'],
  'data-render-id': computed.oneWay('node.renderId'),


  svg: htmlSafe(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
        <use xlink:href="#arrows-small-down"></use>
      </svg>`),

  didRender(){
    const input = this.element.getElementsByClassName('dropdown-list')[0];
    const options = get(this, 'node.options');
    mobiInitTreeList(input, {
      placeholder: get(this, 'node.placeholder'),
      onSet: (e)=>{
        //列表的索引值
        const index = parseInt(e.valueText);
        //当前选项
        const option = options[index];
        //根据索引值，获取其文字内容
        const text = option.text;
        //设置mobileScroll生成的input的值
        input.previousElementSibling.value = text;
        //设置当前题目的value值
        set(this, 'node.value', text);

        this.handleEvents.handleOptionInput(index,option, get(this,'node'));
      },
      onInit: () => {
        const mobiInput = input.previousElementSibling
        mobiInput.value = get(this, 'node.value');
        //设置input的class名称
        mobiInput.setAttribute('class', 'ui-menu');
      }
    });
  }
}).reopenClass({ positionalParams: ['node','handleEvents']});
