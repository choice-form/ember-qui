/**
 * 矩阵题
 *
 * @class matrix(矩阵题)
 */


/**
 * node
 *
 * @property {object} node
 * @property {String} node.title - 节点标题
 * @property {String} node.description - 节点描述
 * @property {Array} node.images - 节点图片,数组类型,可以传多张
 * @property {String} node.renderId - 页面渲染的ID号,单页滚动时候需要
 * @property {String} node.typeName - 选项类型名称
 * @property {String} node.quesType - 当前的题型
 * @property {bool} node.asterisks - 当前节点,是否为必选, 'true' or 'false'
 * @property {String} node.uuid - 当前题目节点的唯一ID
 * @property {String} node.number - 当前节点的索引值
 * @property {Array} node.optionsX - 头部上面的选项
 * @property {Array} node.optionsY - 左侧栏目的选项
 * @property {Array} node.matrix - 矩阵选项(二维数组)
 * @property {Array} node.otherOptions - 其他选项
 *
 * @example
 ```javascript
 node:{
      title: faker.finance.accountName(),
      description: faker.lorem.paragraph(),
      images: [
        {
          ratio: 0.6666667, //图片显示比例
          natural:'/images/sample-1.jpg', //原始图url地址
          thumbnail:'/images/sample-1-thumbnail.jpg', //缩略图url地址
        }
      ],
      typeName: '排序题',
      renderId: '4567yy0-0987',
      quesType: 'matrix',
      uuid: '005',
      asterisks: true,
      number: '7',
      optionsX:[
            {
              text: `COLUMN1 ${faker.finance.accountName()}`,
            },
            {
              text: `COLUMN2 ${faker.finance.accountName()}`,
            },
      ],
       optionsY:[
            {
              text: `ROW1 ${faker.lorem.sentence()}`,
            },
            {
              text: `ROW2 ${faker.lorem.sentence()}`,
            },
      ],
      matrix:[
            [
              {
                selected:false,
                renderId:Math.random(1000),
              },
              {
                selected:false,
                renderId:Math.random(1000),
              },
              {
                selected:false,
                renderId:Math.random(1000),
              },
              {
                selected:false,
                renderId:Math.random(1000),
              },
            ],
            [
              {
                selected:false,
                renderId:Math.random(1000),
              },
              {
                selected:false,
                renderId:Math.random(1000),
              },
              {
                selected:false,
                renderId:Math.random(1000),
              },
              {
                selected:false,
                renderId:Math.random(1000),
              },
            ],
      ],
      otherOptions:[
            {
              selected:false,
              inputType: 'input', // 'select', 'input', 'select-input, ower-input',
              inputRule: 'date', //输入控件初始化规则
            },
            {
              selected:false,
              inputType: 'input', // 'select', 'input', 'select-input, ower-input',
              inputRule: 'dateRange', //输入控件初始化规则
            }
          ]

 }
 ```
 */


/**
 * 选项点击时的回调方法
 *
 * @method handleOptionClick
 * @param {object} option 关联的选项
 * @param {object} question 关联的问题
 * @return {boolean}
 ```javascript
 handleOptionClick(option, question){
        return true;
      },
  ```
 */


/**
 * 选项输入回调方法
 *
 * @method handleOptionInput
 * @param {number|object|String} input的值
 * @param {object} option 关联的选项
 * @param {object} question 关联的问题
 * @return {boolean|Promise}

 ```
 */
