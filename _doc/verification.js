/**
 * 验证题
 *
 * @class verification(验证题)
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
 * @property {String} node.quesType - 当前的题型: verification
 * @property {String} node.verificationType - 验证类型: message, password, v-code
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
      typeName:'验证节点',
      renderId: '4567890-0987',
      quesType: 'verification',
      verificationType: 'message', //message, password, v-code
      uuid: '002',
      isMust:true,
      number:'3',
 }
 ```
 */



/**
 * 选项点击时的回调方法
 *
 * @method handleOptionClick
 * @param {object} option 关联的选项
 * @param {object} question 关联的问题
 * @returns {boolean} 回调任务执行结果 true：正常 false：无法执行
 handleOptionClick(option, question){
        return true;
      },
 */
