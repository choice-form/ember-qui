/* eslint-disable */
import Route from 'ember-route';
import set from 'ember-metal/set';

export default Route.extend({
  model() {


    return {
      nodes:[
        {
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
          rewardVaule: `$${faker.finance.mask()}`,
          quesType: 'lottery',
          uuid: '002',
          rewardTime:'2016-11-11 00:00',
        }
      ],

      handleEvents: {

        handleNextClick: (question) => {
          console.log('前往领取奖励');
        }
      },

      nextButton: 'Next',

    }
  }
});
