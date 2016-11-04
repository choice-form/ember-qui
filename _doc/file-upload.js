/**
 * 图片上传题
 *
 * @class file-upload(上传题)
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
      typeName: '图片上传题',
      quesType: 'file-upload',
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
 * @property {Bool} option.selected - 选项是否被选择
 * @property {String} option.renderId - 当前选项的渲染ID,用于单页的滚动
 * @property {String} option.text - 选项文字
 * @property {String} option.uuid - 选项ID值
 * @property {String} option.icon - 选项Icon
 * @property {String} option.image - 图片上传之后的,获取远程的图片url

 * @example
 ```javascript
 option:{
      selected: false,
      renderId: faker.date.between('2016-01-01', '2016-12-31'),
      text: 'Submit your photograph. You need to submit at least one photograph with the front view of face.',
      uuid: faker.date.between('2016-01-01', '2016-12-31'),
      icon: 'upload', // 选项的Icon
      image: '/images/sample-pinterest/sample-pinterest-4.jpg',
   }
 ```
 */


/**
 * 选项输入回调方法
 *
 * @method handleOptionInput
 * @param {number|object} data 输入数数据，简单输入框传字符值，复杂输入框自由传对象，如上传文件的传文件对象
 * @param {object} option 关联的选项
 * @param {object} question 关联的问题
 * @returns {boolean|Promise} 回调任务执行结果 true：正常 false：无法执行
 *                            文件上传场合返回Promise
 handleOptionInput(data, option, question){
        return true;
      },
 */
