import Controller from 'ember-controller';
import { isPresent } from 'ember-utils';
import { htmlSafe } from 'ember-string';
import faker from 'faker';
export default Controller.extend({


  header:{
    questionText:'',
    questionDescribe:'',
    images:[],
    typeText:'',
  },
  question:{
    nodeName: "seletedNode",
    nodeType: 1,
    options:[1, 2, 3].map(function (item, index) {
      return {
        text: faker.address.streetAddress(true),
        selected: false,
      };
    }),
  },
  button:{
    nexButton: '下一题',
    prevButton: '上一题',
    handClick: function () {
      console.info('这里是点击[按钮]的回调方法');
    }
  },
  logoText:'choiceForm',


  otherTest:{
    address: faker.address.streetAddress(true),
    paragraph: faker.lorem.paragraph(),
    image: faker.image.image(360, 360, true),
    randomParagraphs: faker.lorem.paragraphs(faker.random.number({min: 1, max: 3}), '\n'),
    selected: [0, 1][parseInt(Math.random() * 2)],
  },
});
