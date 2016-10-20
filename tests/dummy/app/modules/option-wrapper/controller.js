import Controller from 'ember-controller';
import faker from 'faker';
export default Controller.extend({
  question:{
    nodeName: "seletedNode",
    nodeType: 1,
    options:[1, 2, 3].map(function () {
      return {
        text: faker.address.streetAddress(true),
        selected: false,
      };
    }),

    prevButton: '上一题',
    nextButton: '下一题',
  },
});
