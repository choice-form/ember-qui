import Service from 'ember-service';
import set from 'ember-metal/set';
import {htmlSafe} from 'ember-string';

export default Service.extend({

  /*
  获取题型的名称
   */
  getOptionComponentName(type){
    return type;
  },

  /*
   获取选项的Icon
   */
  getOptionSvg(slected, icon){
    let svgName, color = '', svgSize = '16', viewBox = '16';
    svgName = slected ? `${icon}-active` : icon;
    color = slected ? '' : '';
    return htmlSafe(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width=${svgSize} height=${svgSize} viewBox="0 0 ${viewBox} ${viewBox}">
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
