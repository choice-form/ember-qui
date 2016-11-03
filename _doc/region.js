/**
 * 地域题
 *
 * @class choice(地域题)
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
 * @property {String} node.isMust - 当前节点,是否为必选, 'true' or 'false'
 * @property {String} node.uuid - 当前题目节点的唯一ID
 * @property {String} node.number - 当前节点的索引值
 * @property {String} node.value - 定位所得到的值
 * @property {String} node.placeholder - placeholder
 * @example
 ```javascript
 node:{
    title: faker.lorem.words(),
    description: faker.lorem.paragraph(),
    images: [
        {
          ratio: 0.6666667, //图片显示比例
          natural:'/images/sample-1.jpg', //原始图url地址
          thumbnail:'/images/sample-1-thumbnail.jpg', //缩略图url地址
        }
      ],
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
 }
 ```
 */

/**
 * handleOptionInput oninput,事件
 *
 * @method handleOptionInput
 */
