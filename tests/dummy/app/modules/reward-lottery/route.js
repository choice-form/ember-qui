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
      quesType: 'lottery',
      isReward:true,
      buttonText: '前往领取',
      uuid: '002',
      rewardTime:'2016-11-11 00:00',
      handleEvents: {
        handleOptionClick: (option, node) => {
        },

        handleOptionInput: (option, node) => {
          console.log(option);
          console.log(node);
        },

        handlePrevClick: () => {
          console.log('点击了上一题');
        },

        handleNextClick: () => {
          console.log('点击了下一题');
        }
      },

      prevButton: '上一题',

      nextButton: '下一题',

    }
  }
});
