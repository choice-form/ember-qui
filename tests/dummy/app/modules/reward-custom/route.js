/* eslint-disable */

import Route from 'ember-route';
import set from 'ember-metal/set';
import faker from 'faker';


export default Route.extend({
  model() {


    return {
      rewardName: '通用汽车调查有奖活动',
      images: [
        {
          ratio: 0.6666667,
          natural:'/images/sample-1.jpg',
          thumbnail:'/images/sample-1-thumbnail.jpg',
        }
      ],
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      rewardVaule: '1',
      weixinImage: '',
      typeName: '验证节点',
      quesType: 'reward',
      rewardType: 'custom', //weixin, custom,
      rewardTime: '2016-11-11 00:00',
      uuid: '002',
      RewardToMessage: true,
      RewardToQrcode: true,
      qrImage: "https://csvfx-files.b0.upaiyun.com/UploadFiles/style-copy/img/_QRcode-01.png",
      qrCode: '123456789',
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
