import Service from 'ember-service';
import set from 'ember-metal/set';

export default Service.extend({
  generateAPI(type) {
    switch(type) {
    case 'single-select':
      return this.generateAPIForSingleSelect();
    default:
      return {};
    }
  },

  generateAPIForSingleSelect() {
    return {
      /*
        保存单选当前选中选项的 ID
      */
      selectedId: null,

      /*
        改变单选当前的选中项
        this -> optionComponent
      */
      changeSelection(id) {
        set(this, 'selectedId', id);
      }
    }
  }
});
