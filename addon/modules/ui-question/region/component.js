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

  regions : [
    {
      Meaning: '北京',
      Value: 110000,
      cities:[
        {
          Meaning: '北京',
          Value: 110100,
          counties:[
            {
              Meaning: '曹阳区',
              Value: 110101,
              id:110101,
            },
            {
              Meaning: '东城区',
              Value: 110102,
              id: 110102,
            },
            {
              Meaning: '西城区',
              Value: 110103,
              id: 110103,
            }
          ]
        }
      ]
    },
    {
      Meaning: '河南',
      Value: 410000,
      cities:[
        {
          Meaning: '郑州市',
          Value: 410100,
          counties:[
            {
              Meaning: '市辖区',
              Value: 410101,
              id:410101,
            },
            {
              Meaning: '中原区',
              Value: 410102,
              id: 410102,
            },
            {
              Meaning: '二七区',
              Value: 410103,
              id: 410103,
            }
          ]
        },
        {
          Meaning: '开封市',
          Value: 410200,
          counties:[
            {
              Meaning: '鼓楼区',
              Value: 410201,
              id:410201,
            },
            {
              Meaning: '南关区',
              Value: 410202,
              id: 410202,
            },
            {
              Meaning: '杞县',
              Value: 410203,
              id: 410203,
            },
            {
              Meaning: '通许县',
              Value: 410204,
              id: 410204,
            }
          ]
        }
      ]
    },
    {
      Meaning: '浙江',
      Value: 510000,
      cities:[
        {
          Meaning: '杭州市',
          Value: 510100,
          counties:[
            {
              Meaning: '市辖区',
              Value: 510101,
              id:510101,
            },
            {
              Meaning: '杭州1',
              Value: 510102,
              id: 510102,
            },
            {
              Meaning: '杭州2',
              Value: 510103,
              id: 510103,
            }
          ]
        },
        {
          Meaning: '宁波市',
          Value: 510200,
          counties:[
            {
              Meaning: '宁波1',
              Value: 510201,
              id:510201,
            },
            {
              Meaning: '宁波2',
              Value: 510202,
              id: 510202,
            },
            {
              Meaning: '宁波3',
              Value: 510203,
              id: 510203,
            },
            {
              Meaning: '宁波4',
              Value: 510204,
              id: 510204,
            }
          ]
        }
      ]
    }
  ],

  didRender(){
    const input = this.element.getElementsByClassName('region-list')[0];
    const options = get(this, 'node.options');
    mobiInitTreeList(input, {
      placeholder: get(this, 'node.placeholder'),
      onSet: (event, inst)=>{
        //列表的索引值
        const indexs = event.valueText.split(' ');
        const indexLength = indexs.length;

        let value = '';
        const region = get(this, 'regions');
        if(indexLength  < 2 ){
          value =  `${region[indexs[0]].Meaning}`;
        }else if(indexLength  <= 2 ){
          value = `${region[indexs[0]].Meaning}-${region[indexs[0]].cities[indexs[1]].Meaning}`;
        }else {
          value = `${region[indexs[0]].Meaning}-${region[indexs[0]].cities[indexs[1]].Meaning}-${region[indexs[0]].cities[indexs[1]].counties[indexs[2]].Meaning}`;
        }

        //设置当前题目的value值
        set(this, 'node.value', value);

        //设置mobileScroll生成的input的值
        input.previousElementSibling.value = value;

        this.handleEvents.handleOptionInput('', get(this,'node'));


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
