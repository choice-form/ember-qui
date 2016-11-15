/* eslint-disable */
import Route from 'ember-route';
import faker from 'faker';

export default Route.extend({
  model() {


    return {
      title: `title${faker.finance.accountName()}`,
      description: `description${faker.lorem.paragraph()}`,
      rewardVaule: `$${faker.finance.mask()}`,
      wechatImage: faker.image.avatar(),
      wechatID: faker.name.findName(),
      icon: 'present-gift',
      typeName: '验证节点',
      quesType: 'reward',
      rewardType: 'wechat', //wechat, custom,
      uuid: '002',
      rewardTime: faker.date.past(),
      handleEvents: {

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
