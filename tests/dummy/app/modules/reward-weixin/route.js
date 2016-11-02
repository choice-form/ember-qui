/* eslint-disable */
import Route from 'ember-route';
import faker from 'faker';

export default Route.extend({
  model() {


    return {
      rewardName: '通用汽车调查有奖活动',
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      rewardVaule: '1',
      weixinImage: '/images/sample-1.jpg',
      typeName:'验证节点',
      quesType: 'reward',
      rewardType: 'weixin', //weixin, custom,
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
