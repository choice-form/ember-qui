/* eslint-disable */
import EmberObject from '@ember/object';
import Route from '@ember/routing/route';
import { set } from '@ember/object';
import faker from 'faker';

export default Route.extend({
  model() {

    let options = [
      EmberObject.create({
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
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
      }),
      EmberObject.create({
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        alignSelf:'auto',
        padding: '16px',
        marginT: '16px',
        marginR: '16px',
        marginB: '16px',
        marginL: '16px',
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
          },
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
      EmberObject.create({
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        alignSelf:'auto',
        padding: '16px',
        marginT: '16px',
        marginR: '16px',
        marginB: '16px',
        marginL: '16px',
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
      EmberObject.create({
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
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
      }),
      EmberObject.create({
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        alignSelf:'auto',
        padding: '16px',
        marginT: '16px',
        marginR: '16px',
        marginB: '16px',
        marginL: '16px',
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
          },
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
          },
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
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
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
