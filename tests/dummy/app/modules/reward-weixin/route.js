/* eslint-disable */
import Route from 'ember-route';
import faker from 'faker';

export default Route.extend({
  model() {


    return {
      title: `title${faker.finance.accountName()}`,
      description: `description${faker.lorem.paragraph()}`,
      rewardVaule: `$${faker.finance.mask()}`,
      weixinImage: faker.image.avatar(),
      weixinID: faker.name.findName(),
      icon: 'present-gift',
      typeName: '验证节点',
      quesType: 'reward',
      rewardType: 'weixin', //weixin, custom,
      uuid: '002',
      rewardTime: faker.date.past(),
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
