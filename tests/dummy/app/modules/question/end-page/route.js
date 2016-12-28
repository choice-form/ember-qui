import Route from 'ember-route';
import set from 'ember-metal/set';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {

    let options = [];

    return {
      nodes:[
        {
          title: faker.finance.accountName(),
          description: faker.lorem.paragraph(),
          images: [
            {
              ratio: 0.6666667,
              natural:'/images/sample-1.jpg',
              thumbnail:'/images/sample-1-thumbnail.jpg',
            }
          ],
          typeName:'结束',
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
          quesType: 'end-page',
          selectType: '',
          showStyle: '',
          uuid: '002',
          hasReward: true,
          isMust:true,
          number:'3',
          value:'123123',
          placeholder:'请下拉选择',
          hideLogo:true,
          options,
        }
      ],

      handleEvents: {
        handleOptionClick: (option, node) => {
          console.log(option);
          console.log(node);
          if (option.toggleProperty('selected')) {

            options.forEach((opt) => {
              if (opt != option) {
                set(opt, 'selected', false);
              }
            })
          }
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

      hideFooter: true,
      customText:'janisesheng',
      customLogo:'/images/sample-1.jpg',

      hideLogo: false,
    }
  }
});
