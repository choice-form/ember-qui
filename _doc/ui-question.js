/**
 * ui-question
 *
 * @class -ui-question(question页面)
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
 * @property {String} node.selectType - 选择类型, 是【单选】或【多选】
 * @property {String} node.isMust - 当前节点,是否为必选, 'true' or 'false'
 * @property {String} node.showStyle - 用于【图片选择题】的多种显示模式
 * @property {String} node.uuid - 当前题目节点的唯一ID
 * @property {String} node.number - 当前节点的索引值
 * @property {String} node.value - 获取当前下拉菜单的值
 * @property {String} node.placeholder - 下拉菜单的placeholder, mobiscroll使用
 * @example
 ```javascript
 node:{
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      images: [
        {
          ratio: 0.667, //图片比例
          natural:'/images/sample-1.jpg', //原始图片
          thumbnail:'/images/sample-1-thumbnail.jpg', //缩列图
        }
      ],
      typeName:'分值打分题',
      renderId: '4567890-0987',
      quesType: 'dropdown', //select, fill, valuemark, graphmark, menu
      uuid: '002',
      isMust:true,
      number:'3',
      value:'123123',
      placeholder:'请下拉选择',
 }
 ```
 */

/**
 * option,当前题目选项
 *
 * @property {Object} option
 * @property {Boolean} option.selected - 选项是否被选择
 * @property {String} option.renderId - 当前选项的渲染ID,用于单页的滚动
 * @property {String} option.text - 选项文字
 * @property {String} option.uuid - 选项ID值
 * @property {String} option.icon - 选项Icon
 * @property {String} option.inputType - 其他选项类型, 'select', 'input',
 *   'select-input
 * @property {String} option.inputRule - 备注的input类型, 如下:
 *   'noValidation','','int','phone','float','email','date','dateRange','time','timeRange','postCode','url'
 * @property {String} option.value - input,textarea,mobileScroll等其他控件使用的Value
 * @property {String} option.placeholder - input,textarea的 placeholder值
 * @example
 ```javascript
 option:{
      selected: false,
      renderId: '4567890-0987',
      text: faker.lorem.sentence(),
      uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
      icon: 'radio', // 选项的Icon
      inputType: 'select-input', // 'select', 'input', 'select-input,
      inputRule: 'timeRange', //输入控件初始化规则
      value: 'Here is options comment',
      placeholder: 'comment',
   }
 ```
 */

/**
 * 选项点击时的回调方法
 *
 * @method handleOptionClick
 * @param {object} option 关联的选项
 * @param {object} question 关联的问题
 * @return {boolean} 回调任务执行结果 true：正常 false：无法执行
 handleOptionClick(option, question){
        return true;
      },
 */

/**
 * 选项输入回调方法
 *
 * @method handleOptionInput
 * @param {number|object} data 输入数数据，简单输入框传字符值，复杂输入框自由传对象，如上传文件的传文件对象
 * @param {object} option 关联的选项
 * @param {object} question 关联的问题
 * @return {boolean|Promise} 回调任务执行结果 true：正常 false：无法执行
 *                            文件上传场合返回Promise
 handleOptionInput(data, option, question){
        return true;
      },
 */

/**
 * 选项拖拽结束回调方法
 *
 * @method handleOptionDrop
 * @param {number} startIndex 原始索引值
 * @param {number} endIndex 结束索引值
 * @param {number} question 关联的问题
 * @return {boolean} 回调任务执行结果 true：正常 false：无法执行

 handleOptionDrop(startIndex, endIndex, question){
        return true;
      },
 */

/**
 * 输入问题数据回调方法
 *
 * @method handleQuestionInput
 * @param {object|string} dynamic 输入的数据
 * @param {object} question 关联的问题
 * @return {boolean} 回调任务执行结果 true：正常 false：无法执行

 handleQuestionInput(dynamic, question){
        return true;
      },
 */

/**
 * 点击前一题回调方法
 *
 * @method handlePrevClick
 * @return {boolean} 回调任务执行结果 true：正常 false：无法执行
 handlePrevClick(){
      return true;
    },
 */

/**
 * 点击后一题回调方法
 *
 * @method handleNextClick
 * @return {Promise} 会解析处理结果的Promise

 handleNextClick(){
    return new Promise();
  }
 */
