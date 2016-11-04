/**
 * 填空题
 *
 * @class short-text(填空题)
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
      typeName: '填空题',
      quesType: 'short-text',
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
 * @property {String} option.uuid - 选项ID值
 * @property {String} option.icon - 选项Icon
 * @property {String} option.inputType - 输入类型, 'input', 填空题只有'input'
 * @property {String} option.inputRule -的input验证规则, 如下: 'noValidation','','int','phone','float','email','date','dateRange','time','timeRange','postCode','url'
 * @property {String} option.value - input,textarea,mobileScroll等其他控件使用的Value
 * @property {String} option.placeholder - input,textarea的 placeholder值

 * @example
 ```javascript
 option:{
      renderId: '4567890-0987',
      text:'',
      uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C903",
      icon: '', // 选项的Icon
      inputType: 'input',
      inputRule: 'url', //输入控件初始化规则
      value: '',
      placeholder: 'url',
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
