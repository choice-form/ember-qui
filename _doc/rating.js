/**
 * 图形打分题
 *
 * @class rating(图形打分题)
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
      typeName: '图形打分题',
      quesType: 'rating',
      uuid: '001',
      isMust:true,
      number:'1',
 }
 ```
 */



/**
 * ioption,当前题目选项
 *
 * @property {Object} option
 * @property {String} option.renderId - 当前选项的渲染ID,用于单页的滚动
 * @property {String} option.text - 选项文字
 * @property {String} option.uuid - 选项ID值
 * @property {String} option.icon - 选项Icon check, crown, flower, heart, star, delete, like, dislike
 * @property {String} option.emoji - emoji表情
 * @property {String} option.count - 图形数量
 * @property {String} option.value - 默认当前已选几个图形
 * @property {Array} option.marks - 每个图形的小描述小标记, 数量应该个【count】的值一样
 * @example
 ```javascript
 option:{
        renderId: '4567890-0987',
        text: faker.lorem.sentence(),
        description: 'Rating Labels',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: 'star', // 选项的Icon
        emoji: ['☹️', '😍'],
        value: '5',
        count: '5',
        marks:[1,2,3,4,5].map(function () {
          return faker.random.number();
        }),
   }
 ```
 */



/**
 * 选项输入输入事件回调方法
 *
 * @method handleOptionInput
 * @param {object} data input的返回对象'e' ,
 * @param {object} option 关联的选项
 * @param {object} question 关联的问题
 */

