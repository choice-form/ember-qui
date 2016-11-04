/**
 * 图片选择题
 *
 * @class picture-choice(图片选择题)
 */



/**
 * node
 *
 * @property {object} node
 * @property {String} node.title - 节点标题
 * @property {String} node.description - 节点描述
 * @property {String} node.renderId - 页面渲染的ID号,单页滚动时候需要
 * @property {String} node.typeName - 选项类型名称
 * @property {String} node.quesType - 当前的题型
 * @property {String} node.selectType - 选择类型, 是【单选】或【多选】
 * @property {String} node.showStyle - 图片显示类型'vertical,grid,matrix,thumbnail,pinterest'
 * @property {String} node.textDirection - 图片文字的位置 'in-block , out-block, empty'
 * @property {String} node.picType - 是否显示左上角的选择角标 'superscript'
 * @property {String} node.pictureSize: - thumbnail模式使用,控制图片的大小 'picture-large',  //picture-large, picture-small
 * @property {String} node.isMust - 当前节点,是否为必选, 'true' or 'false'
 * @property {String} node.uuid - 当前题目节点的唯一ID
 * @property {String} node.number - 当前节点的索引值
 * @example
 ```javascript
 node:{
      title: 'Picture Vertical insert-block',
      description: faker.lorem.paragraph(),
      images: '',
      renderId:'775519',
      typeName: '图片选择题',
      quesType: 'picture-choice', //select, fill
      selectType: 'radio',
      showStyle: 'vertical', //'vertical, grid, matrix, thumbnail, pinterest'
      picStyle:'superscript', //是否显示左上角的选择角标 'superscript'
      textDirection:'insert-block', //in-block ,out-block, empty
      pictureSize: 'picture-large',  //picture-large, picture-small
      uuid: faker.date.between('2016-01-01', '2016-12-31'),
      isMust:false,
      number:'2',
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
 * @property {String} option.inputType - 其他选项类型, 'select', 'input', 'select-input
 * @property {String} option.inputRule - 备注的input类型, 如下: 'noValidation','','int','phone','float','email','date','dateRange','time','timeRange','postCode','url'
 * @property {String} option.value - input,textarea,mobileScroll等其他控件使用的Value
 * @property {String} option.placeholder - input,textarea的 placeholder值

 * @example
 ```javascript
 option:{
      selected: false,
      renderId: '4567890-0987',
      text: faker.lorem.sentence(),
      uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
      icon: 'radio', // 选项的Icon, 'radio'或者'checkbox'
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
