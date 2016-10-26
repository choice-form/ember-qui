import Service from 'ember-service';
import set from 'ember-metal/set';
import {htmlSafe} from 'ember-string';

export default Service.extend({

  /*
  获取题型的名称
   */
  getOptionComponentName(nodeType){
    return nodeType;
  },

  /*
   获取选项的Icon
   */
  getOptionSvg(slected, icon){
    const  svgName = slected ? `${icon}-active` : icon;
    return htmlSafe(`<svg data-color=${slected ? 'color7' : 'color6'} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
        <use xlink:href=#${svgName}></use>
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
