import Service from 'ember-service';
import set from 'ember-metal/set';
import {htmlSafe} from 'ember-string';

export default Service.extend({

  /*
  获取题型的名称
   */
  getOptionComponentName(type){
    if(['select'].includes(type)){
      return 'cell';
    }else{
      return type;
    }
  },

  /*
   获取选项的Icon
   */
  getOptionSvg(slected, icon){
    let svgName, color = '';
    svgName = slected ? `${icon}-fill` : icon;
    color = slected ? 'red' : '';
    return htmlSafe(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
        <use xlink:href=#${svgName} fill=${color}></use>
      </svg>`);
  },


  /*
  API 暂时不用
   */
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
