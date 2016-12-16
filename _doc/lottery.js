/**
 * 奖励抽奖页面
 *
 * @class lottery(奖励抽奖页面)
 */


/**
 * node for lottery(奖励抽奖页面)
 *
 * @property {object} node
 * @property {String} node.title - 节点标题
 * @property {String} node.description - 节点描述
 * @property {bool} node.hasReward - 是否中奖
 * @property {bool} node.rewardNumber - 奖励数量
 * @property {Array} node.images - 图片列表
 * @property {String} node.renderId - 页面渲染的ID号,单页滚动时候需要
 * @property {String} node.typeName - 选项类型名称: 抽奖节点
 * @property {String} node.quesType - 当前的题型: lottery
 * @property {String} node.uuid - 当前题目节点的唯一ID
 * @property {String} node.renderId - 渲染
 * @property {String} node.rewardTime - 中奖时间
 * @example
 ```javascript
 node:{
      rewardName: faker.finance.accountName(),
      images: [
        {
          ratio: 0.6666667,
          natural:'/images/sample-1.jpg',
          thumbnail:'/images/sample-1-thumbnail.jpg',
        }
      ],
      title: faker.finance.accountName(),
      description: faker.lorem.paragraph(),
      renderId: faker.date.between('2016-01-01', '2016-12-31'),
      typeName:'抽奖节点',
      hasReward:true, //bool值
      rewardNumber:'100',
      quesType: 'lottery',
      uuid: '002',
      rewardTime:'2016-11-11 00:00',
 }
 ```
 */


/**
 * 点击后一题回调方法
 *
 * @method handleNextClick
 * @return {Promise} 会解析处理结果的Promise

 handleNextClick(){

  }
 */
