import Route from 'ember-route';
import set from 'ember-metal/set';
import Ember from 'ember';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {

    let options = [
      Ember.Object.create({
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        alignSelf:'auto',
        padding: '16px',
        marginT: '16px',
        marginR: '16px',
        marginB: '16px',
        marginL: '16px',
        image:{
          alignSelf: 'auto',
          marginT: '16px',
          marginR: '16px',
          marginB: '16px',
          marginL: '16px',
          width:'120px',
          img: '/images/sample-random/sample-random-0.58-13.jpeg',
        },
        text: [
          {
            alignSelf: 'auto',
            text:faker.lorem.words(),
            marginT: '16px',
            marginR: '16px',
            marginB: '16px',
            marginL: '16px',
            color:'red',
            backgroundColor: 'black',
            textAlign: 'left',
            textTransform: 'inherit',
            fontFamily: 'serif',
            fontSize: '16px',
            fontStyle: 'nomal',
            fontWeight: '500',
            lineHeight: '1.2',
            letterSpacing: 'normal',
            columnCount: '2'
          }
        ],
      }),
      Ember.Object.create({
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        alignSelf:'auto',
        padding: '16px',
        marginT: '16px',
        marginR: '16px',
        marginB: '16px',
        marginL: '16px',
        image:{
          alignSelf: 'auto',
          marginT: '16px',
          marginR: '16px',
          marginB: '16px',
          marginL: '16px',
          width:'120px',
          img: '/images/sample-random/sample-random-0.562-12.jpeg',
        },
        text: [
          {
            alignSelf: 'auto',
            text:faker.lorem.words(),
            marginT: '16px',
            marginR: '16px',
            marginB: '16px',
            marginL: '16px',
            color:'red',
            backgroundColor: 'black',
            textAlign: 'left',
            textTransform: 'inherit',
            fontFamily: 'serif',
            fontSize: '16px',
            fontStyle: 'nomal',
            fontWeight: '500',
            lineHeight: '1.2',
            letterSpacing: 'normal',
            columnCount: '2'
          }
        ],
      }),
      Ember.Object.create({
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        alignSelf:'auto',
        padding: '16px',
        marginT: '16px',
        marginR: '16px',
        marginB: '16px',
        marginL: '16px',
        image:{
          alignSelf: 'auto',
          marginT: '16px',
          marginR: '16px',
          marginB: '16px',
          marginL: '16px',
          width:'120px',
          img: '/images/sample-random/sample-random-0.562-31.jpeg',
        },
        text: [
          {
            alignSelf: 'auto',
            text:faker.lorem.words(),
            marginT: '16px',
            marginR: '16px',
            marginB: '16px',
            marginL: '16px',
            color:'red',
            backgroundColor: 'black',
            textAlign: 'left',
            textTransform: 'inherit',
            fontFamily: 'serif',
            fontSize: '16px',
            fontStyle: 'nomal',
            fontWeight: '500',
            lineHeight: '1.2',
            letterSpacing: 'normal',
            columnCount: '2'
          }
        ],
      }),
      Ember.Object.create({
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        alignSelf:'auto',
        padding: '16px',
        marginT: '16px',
        marginR: '16px',
        marginB: '16px',
        marginL: '16px',
        image:{
          alignSelf: 'auto',
          marginT: '16px',
          marginR: '16px',
          marginB: '16px',
          marginL: '16px',
          width:'120px',
          img: '/images/sample-random/sample-random-0.633-9.jpeg',
        },
        text: [
          {
            alignSelf: 'auto',
            text:faker.lorem.words(),
            marginT: '16px',
            marginR: '16px',
            marginB: '16px',
            marginL: '16px',
            color:'red',
            backgroundColor: 'black',
            textAlign: 'left',
            textTransform: 'inherit',
            fontFamily: 'serif',
            fontSize: '16px',
            fontStyle: 'nomal',
            fontWeight: '500',
            lineHeight: '1.2',
            letterSpacing: 'normal',
            columnCount: '2'
          }
        ],
      }),
      Ember.Object.create({
        renderId: '4567890-0987',
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        alignSelf:'auto',
        padding: '16px',
        marginT: '16px',
        marginR: '16px',
        marginB: '16px',
        marginL: '16px',
        image:{
          alignSelf: 'auto',
          marginT: '16px',
          marginR: '16px',
          marginB: '16px',
          marginL: '16px',
          width:'120px',
          img: '/images/sample-random/sample-random-0.666-4.jpeg',
        },
        text: [
          {
            alignSelf: 'auto',
            text:faker.lorem.words(),
            marginT: '16px',
            marginR: '16px',
            marginB: '16px',
            marginL: '16px',
            color:'red',
            backgroundColor: 'black',
            textAlign: 'left',
            textTransform: 'inherit',
            fontFamily: 'serif',
            fontSize: '16px',
            fontStyle: 'nomal',
            fontWeight: '500',
            lineHeight: '1.2',
            letterSpacing: 'normal',
            columnCount: '2'
          }
        ],
      }),
    ];

    return {

      nodes: [
        {
          title: faker.lorem.words(),
          description: faker.lorem.paragraph(),
          images: '',
          typeName: '整页滚动',
          renderId: '4567890-0987' + Math.random(1000),
          quesType: 'slide',
          justifyContent: 'center',
          backgroundImage: '/images/sample-random/sample-random-0.58-13.jpeg',
          backgroundPosition:'center center',
          backgroundRepeat:'no-repeat',
          backgroundSize:'100%',
          options,
        }
      ],

      handleEvents: {

      },

      prevButton: '上一题',

      nextButton: '下一题',
    }
  }
});
