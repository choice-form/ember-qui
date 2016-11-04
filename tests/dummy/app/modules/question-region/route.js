/* eslint-disable */
import Route from 'ember-route';
import set from 'ember-metal/set';
import faker from 'faker';

export default Route.extend({
  model() {

    let options = [];

    return {
      nodes:[
        {
          title: faker.lorem.words(),
          description: faker.lorem.paragraph(),
          images: '',
          typeName:'地域题',
          renderId: '4567890-0987',
          quesType: 'region',
          selectType: '',
          showStyle: '',
          uuid: '002',
          isMust:true,
          number:'3',
          value:'上海市-上海市-徐汇区',
          placeholder:'选择你所在的城市',
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
          grade:2,//treeList的数量
          options,
        }
      ],

      handleEvents: {
        handleOptionClick: (option, node) => {
          console.log(option);
          console.log(node);
          if (option.toggleProperty('selected')) {

            options.forEach((opt) => {
              if (opt != option) {
                set(opt, 'selected', false);
              }
            })
          }
        },

        handleOptionInput: (option, node) => {
          console.log(option);
          console.log(node);
        },

        handlePrevClick: () => {
          console.log('点击了上一题');
        },

        handleNextClick: () => {
          console.log('点击了下一题');
        }
      },

      prevButton: '上一题',

      nextButton: '下一题',

    }
  }
});
