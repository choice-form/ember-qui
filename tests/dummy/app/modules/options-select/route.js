import Route from 'ember-route';
import set from 'ember-metal/set';
import get from 'ember-metal/get';
import Ember from 'ember';
import faker from 'faker';


export default Route.extend({
  model() {

    let options = [
      Ember.Object.create({
        selected: false,
        text: faker.address.streetAddress(true),
        uuid: "299CA073-8FD0-4C6F-8C07-02B063AC8C90",
        icon: '#svg-folder', // 选项的Icon
        inputType: '', // 'select', 'input', 'select-input',
        inputRule: '', //输入控件初始化规则
        value: '',
        placeholder: '',
      }),
      Ember.Object.create({
        selected: true,
        text: '',
        uuid: "443E6B4F-D705-483D-905F-07E420920E19",
        icon: '#svg-folder',
        inputType: 'input',
        inputRule: 'time',
        value: faker.address.streetAddress(true),
        placeholder: '',
      }),
      Ember.Object.create({
        selected: false,
        text: faker.lorem.paragraph(),
        uuid: "443E6B4F-D705-483D-905F-07E420920E18",
        icon: '#svg-folder',
        inputType: 'select',
        inputRule: '',
        value: '',
        placeholder: '',
      }),
      Ember.Object.create({
        selected: false,
        text: faker.address.streetAddress(true),
        uuid: "443E6B4F-D705-483D-905F-07E420920E15",
        icon: '#svg-folder',
        inputType: 'select-input',
        inputRule: 'time',
        value: faker.address.streetAddress(true),
        placeholder: '',
      }),
      Ember.Object.create({
        selected: false,
        text: faker.lorem.paragraph(),
        uuid: "443E6B4F-D705-483D-905F-07E420920E12",
        icon: '#svg-folder',
        inputType: 'input',
        inputRule: 'time',
        value: faker.address.streetAddress(true),
        placeholder: '',
      })
    ];

    return {
      nodeInfo: {
        type: 'select', //select, fill
        selectType: 'radio',
        showStyle: '',
        id: '001',
      },

      options,

      handleOptionClick: (option) => {
        console.log(option);
        if (option.toggleProperty('selected')) {

          options.forEach((opt) => {
            if (opt != option) {
              set(opt, 'selected', false);
            }
          })
        }
      },
    }
  }
});
