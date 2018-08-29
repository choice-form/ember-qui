import EmberObject from '@ember/object';
import Route from '@ember/routing/route';
import { set } from '@ember/object';
import faker from 'faker';

/*eslint-disable no-console */
export default Route.extend({
  model() {

    let options = [
      EmberObject.create({
        selected: '',
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        text: `打分题##/images/sample-1.jpg?w=20&h=30##${faker.finance.accountName()}`,
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: '', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '100',
        minValue: 0,
        maxValue: 10000,
        minValueText:'最小分值',
        maxValueText: '最大分值',
        step:'1',
        placeholder: '',
      }),
      EmberObject.create({
        selected: '',
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        text: faker.lorem.words(),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C91",
        icon: '', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '5',
        minValue: '3',
        maxValue: '10000',
        minValueText:'最小小分值',
        maxValueText: '最大大分值',
        step:2,
        placeholder: '',
      }),
      EmberObject.create({
        selected: '',
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        text: faker.lorem.words(),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C92",
        icon: '', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: 2,
        minValue: 2,
        maxValue: 10000,
        step:4,
        placeholder: '',
      }),
      EmberObject.create({
        selected: '',
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        text: faker.lorem.words(),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C93",
        icon: '', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        minValue: 1,
        maxValue: 10000,
        step:2,
        placeholder: '',
      }),
      EmberObject.create({
        selected: false,
        renderId: faker.date.between('2016-01-01', '2016-12-31'),
        text: faker.lorem.paragraph(),
        uuid: "4ghE6B4F-D705-483D-905F-07E420920E18",
        icon: 'checkbox',
        inputType: 'select',
        inputRule: '',
        value: '选项',
        placeholder: 'input count',
      }),
    ];

    return {

      nodes: [
        {
          title: faker.lorem.words(),
          description: faker.lorem.paragraph(),
          images: '',
          typeName: '滑竿打分',
          renderId: faker.date.between('2016-01-01', '2016-12-31'),
          quesType: 'range', //select, fill, slider
          selectType: '',
          showStyle: '',
          uuid: '002',
          isMust: true,
          number: '7',
          unit: '元',
          options,
        }
      ],

      handleEvents: {
        handleOptionInput(data, option, question){
          console.log(data);
          console.log(option);
          console.log(question);
          set(option, 'value',  data);
          return true;
        },

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

          return true;
        },

      },

      prevButton: '上一题',

      nextButton: '下一题',
    }
  }
});
