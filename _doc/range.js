/**
 * 滑竿打分题
 *
 * @class range(滑竿打分题)
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
      typeName: '滑竿打分题',
      quesType: 'slider',
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
 * @property {String} option.icon - 选项Icon
 * @property {String} option.inputType - 其他选项类型, 'select', 'input', 'select-input
 * @property {String} option.inputRule - 备注的input类型, 如下: 'noValidation','','int','phone','float','email','date','dateRange','time','timeRange','postCode','url'
 * @property {Number} option.value - input,textarea,mobileScroll等其他控件使用的Value
 * @property {Number} option.minValue - 设置滑竿的最小值
 * @property {Number} option.maxValue - 设置滑竿的最大值
 * @property {Number} option.step - 这是滑竿的步进值

 * @example
 ```javascript
 option:{
       renderId: '4567890-0987',
        text: faker.lorem.words(),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C93",
        icon: '', // 选项的Icon
        inputType: 'input', //其他选项, 'input',
        inputRule: 'time', //输入控件初始化规则, 具体有哪些规则,请查看@class: ui-question
        value: 6, //当前的分值
        minValue:1, //最小分值
        maxValue:8, //最大分值
        step: 2, //步进值
   }
 ```
 */


/**
 * 选项输入回调方法
 *
 * @method handleOptionInput
 * @param {number} data 滑竿的数值
 * @param {object} option 关联的选项
 * @param {object} question 关联的问题
*/
