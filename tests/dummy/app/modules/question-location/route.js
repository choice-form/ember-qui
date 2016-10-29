import Route from 'ember-route';
import set from 'ember-metal/set';
import Ember from 'ember';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {
    return {
      nodes: [
        {
          title: faker.lorem.sentences(),
          description: faker.lorem.paragraph(),
          images: ['/images/sample-3.jpg'],
          renderId:'775519',
          typeName: '定位题',
          quesType: 'location', //select, fill
          value:'上海市徐汇区龙华中路600号',
          selectType: '',
          uuid: faker.date.between('2016-01-01', '2016-12-31'),
          isMust:true,
          number:'1',
          options:[],
        },
      ],

      handleEvents: {
        handleOptionClick: (option, node) => {
          console.log(option);
          console.log(node);
          if (option.toggleProperty('selected')) {

            node.options.forEach((opt) => {
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

      prevButton: 'Previous',

      nextButton: 'Next',
    }
  }
});
