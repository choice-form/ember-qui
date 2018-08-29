import Route from '@ember/routing/route';
import { set } from '@ember/object';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {

    let options = [];

    return {
      nodes: [
        {
          title: faker.finance.accountName(),
          description: faker.lorem.paragraph(),
          images: [
            {
              ratio: 0.6666667,
              natural:'/images/welcome/welcome-1.jpg',
              thumbnail:'/images/welcome/welcome-1-thumbnail.jpg',
            }
          ],
          typeName: '描述节点',
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
          quesType: 'intro-page', //select, fill, valuemark
          selectType: '',
          showStyle: '',
          uuid: faker.date.between('2016-01-01', '2016-12-31'),
          isMust: false,
          number: '4',
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
    }
  }
});
