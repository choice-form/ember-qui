/**
 * 排序题
 *
 * @class ranking(排序题)
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
 * @property {String} node.asterisks - 当前节点,是否为必选, 'true' or 'false'
 * @property {String} node.uuid - 当前题目节点的唯一ID
 * @property {String} node.number - 当前节点的索引值
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
      renderId:'12213343234',
      typeName: '排序题',
      quesType: 'ranking',
      uuid: '001',
      asterisks:true,
      number:'1',
 }
 ```
 */



/**
 * ioption,当前题目选项
 *
 * @property {Object} option
 * @property {String} option.sortNo - 排序位置
 * @property {String} option.renderId - 当前选项的渲染ID,用于单页的滚动
 * @property {String} option.text - 选项文字
 * @property {String} option.uuid - 选项ID值
 * @property {String} option.icon - 选项Icon

 * @example
 ```javascript
 option:{
        text: faker.address.streetAddress(true),
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'menu', // 选项的Icon
        sortNo: "5",
   }
 ```
 */


/**
 * 选项拖拽结束回调方法
 *
 * @method handleOptionDrop
 * @param {number} startIndex 原始索引值
 * @param {number} endIndex 结束索引值
 * @param {number} question 关联的问题
 * @return {Array} 返回当前可以标记的序号,如['1','3'];
 */
