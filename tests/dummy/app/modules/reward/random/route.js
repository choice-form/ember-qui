/* eslint-disable */
import Route from 'ember-route';
import set from 'ember-metal/set';

export default Route.extend({
  model() {


    return {
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
      typeName:'抽奖节点',
      rewardVaule: `$${faker.finance.mask()}`,
      wechatImage: faker.image.avatar(),
      wechatID: faker.name.findName(),
      icon: 'present-gift',
      quesType: 'random',
      rewardType: '', //wechat, custom,
      isReward:true,
      buttonText: 'Go to...',
      uuid: '002',
      rewardTime:'2016-11-11 00:00',

      handleEvents: {


        handleNextClick: (question) => {
          set(question, 'quesType', 'reward');
          set(question, 'rewardType', 'wechat');
          set(question, 'isReward', false);
          console.log('前往领取奖励');
        }
      },

      prevButton: '',

      nextButton: '',

    }
  }
});
