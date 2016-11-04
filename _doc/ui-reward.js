/**
 * 奖励页面
 *
 * @class reward(奖励页面)
 */


/**
 * node for weixn(微信奖励)
 *
 * @property {object} node - weixin
 * @property {String} node.title - 节点标题
 * @property {String} node.description - 节点描述
 * @property {String} node.renderId - 页面渲染的ID号,单页滚动时候需要
 * @property {String} node.typeName - 选项类型名称: 奖励节点
 * @property {String} node.quesType - 当前的题型: reward
 * @property {String} node.uuid - 当前题目节点的唯一ID
 *
 * @property {String} node.icon - 当前的题型所用的icon, 如: present-gift
 * @property {String} node.rewardType - 奖励类型, weixin
 * @property {String} node.weixinImage - 微信头像
 * @property {String} node.weixinID - 微信ID号
 * @property {String} node.rewardVaule - 中奖金额
 * @property {String} node.rewardTime - 中奖时间
 * @property {String} node.rewardPeopleName - 中奖人的名称
 * @example
 ```javascript
 node:{
        title: `title${faker.finance.accountName()}`,
        description: `description${faker.lorem.paragraph()}`,
        rewardVaule: "$29", //中奖金额
        weixinImage: faker.image.avatar(),//头像
        weixinID: faker.name.findName(), //微信号
        icon: 'present-gift',
        typeName: '验证节点',
        quesType: 'reward',
        rewardType: 'weixin', //weixin, custom,
        uuid: '002',
        rewardTime: "2016-11-11 11:11",
 }
 ```
 */


/**
 * node for custom(自定义奖励)
 *
 * @property {object} node - custom(自定义奖励)
 * @property {String} node.title - 节点标题
 * @property {String} node.description - 节点描述
 * @property {Array} node.images - 图片列表
 * @property {String} node.renderId - 页面渲染的ID号,单页滚动时候需要
 * @property {String} node.typeName - 选项类型名称: 奖励节点
 * @property {String} node.quesType - 当前的题型: reward
 * @property {String} node.uuid - 当前题目节点的唯一ID
 *
 * @property {String} node.rewardName - 奖励名称
 * @property {String} node.rewardType - 奖励类型, custom
 * @property {String} node.rewardTime - 中奖时间
 *
 * @property {Bool} node.RewardToMessage - 是否通过短信发送奖励信息 true,false
 * @property {Bool} node.RewardToQrcode - 是否通过二维码发送奖励 true, false
 * @property {String} node.qrImage - 二维码的url地址
 * @property {String} node.qrCode - 中奖二维码的描述
 *
 * @property {String} node.rewardPeopleName - 中奖人的名称
 * @example
 ```javascript
 node:{
      rewardName: `Reward Name : ${faker.finance.accountName()}`, //奖励名称
      images: [
        {
          ratio: 0.6666667,
          natural:'/images/sample-1.jpg',
          thumbnail:'/images/sample-1-thumbnail.jpg',
        }
      ],
      title: faker.finance.accountName(),
      description: faker.lorem.paragraph(),
      typeName: '验证节点',
      quesType: 'reward',
      rewardType: 'custom',
      rewardTime: '2016-11-11 00:00',
      uuid: '002',
      rewardToMessage: true,
      rewardToQrcode: true,
      qrImage: "/images/qrcode.png",
      qrCode: faker.lorem.words(),
 }
 ```
 */


/**
 * 选项点击时的回调方法 (自定义奖励)
 *
 * @method handleOptionClick
 * @param {object} option 关联的选项
 * @param {object} question 关联的问题
 * @returns {boolean} 回调任务执行结果 true：正常 false：无法执行
 handleOptionClick(option, question){
        return true;
      },
 */

/**
 * 输入问题数据回调方法 (自定义奖励)
 *
 * @method handleQuestionInput
 * @param {object|string} dynamic 输入的数据
 * @param {object} question 关联的问题
 * @returns {boolean} 回调任务执行结果 true：正常 false：无法执行
 * @example
 ```javascript
 dynamic: {
  phoneNumber: '1725107121',
  code:'1213' //手机短信, 验证码 , 密码
  }

 handleQuestionInput(dynamic, question){
        return true;
      },
 ```
 */


