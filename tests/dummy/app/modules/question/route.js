import Route from 'ember-route';

export default Route.extend({
  model() {
    return {
      type: 'single-select',
      options: [
        {id: 0, text: '第一题'},
        {id: 1, text: '第二题'},
        {id: 2, text: '第三题'},
        {id: 3, text: '第四题'},
        {id: 4, text: '第五题'}
      ]
    }
  }
});
