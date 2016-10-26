import Route from 'ember-route';
import set from 'ember-metal/set';
import get from 'ember-metal/get';
import Ember from 'ember';
import faker from 'faker';


export default Route.extend({
  model() {
    return {
      title:faker.address.streetAddress(true),
      description: faker.lorem.paragraph(),
      images:[1,2].map(function () {
        return faker.image.image(360, 360, true)
      }),

      button:{
        prevButton:{
          text:'上一题',
          handlePrevClick:()=>{
            console.log('点击了上一题');
          }
        },

        nextButton:{
          text:'下一题',
          handleNextClick:()=>{
            console.log('点击了下一题');
          }
        }
      }
    }
  }
});
