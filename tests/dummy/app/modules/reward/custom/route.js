/* eslint-disable */

import Route from 'ember-route';
import faker from 'faker';


export default Route.extend({
  model() {


    return {
      rewardName: `Reward Name : ${faker.finance.accountName()}`,
      images: [
        {
          ratio: 0.6666667,
          natural:'/images/sample-1.jpg',
          thumbnail:'/images/sample-1-thumbnail.jpg',
        }
      ],
      title: faker.finance.accountName(),
      description: faker.lorem.paragraph(),
      rewardVaule: '1',
      typeName: '验证节点',
      quesType: 'reward',
      rewardType: 'custom', //wechat, custom,
      rewardTime: '2016-11-11 00:00',
      uuid: '002',
      rewardToMessage: true,
      rewardToQrcode: true,
      qrImage: "/images/qrcode.png",
      qrCode: faker.lorem.words(),
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
