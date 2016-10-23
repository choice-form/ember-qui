import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {isPresent} from 'ember-utils';
import {htmlSafe} from 'ember-string';


export default Component.extend({
  layout,
  classNames: ['ui-option-other'],

  actions: {
    select() {
      get(this, 'handleClick')(get(this, 'option'));
    },

    change(e){
      const value = e.target.value;
      console.log(value);
      set(this, 'option.value', value);
    },

    stopPropagation(event){
      event.stopPropagation();
    }
  },


  optionSvg: computed('option.inputType', 'option.selected', 'option.icon', function () {
    const inputType = get(this, 'option.inputType');
    const slected = get(this, 'option.selected');
    const icon = get(this, 'option.icon');
    let svgName, color = '';
    if(inputType != 'input'){
      svgName = slected ? `${icon}-fill` : icon;
      color = slected ? 'red' : '';
    }else{
      svgName = icon;
    }
    return htmlSafe(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
        <use xlink:href=${svgName} fill=${color}></use>
      </svg>`);

  }),

  isShowOtherInput: computed('option.inputType', 'option.selected', function () {
    const inputType = get(this, 'option.inputType');
    const selected = get(this, 'option.selected');
    return inputType == 'select-input' && selected ? true : false;
  }),

  isShowInput: false,
  didReceiveAttrs(attrs){
    this._super(...arguments);
    const inputType = get(this, 'option.inputType');
    const selected = get(this, 'option.selected');
    if(inputType === 'input'){
      set(this, 'isShowInput' , false);
      set(this, 'isShowOtherInput' , true);
      return ;
    }
    if(inputType === 'select'){
      set(this, 'isShowInput' , true);
      set(this, 'isShowOtherInput' , false);
      return ;
    }else{
      set(this, 'isShowInput' , true);
    }
  },

  didInsertElement() {
    const input = this.element.querySelector('input');
    get(this, 'option.selected') && input.setAttribute('checked','checked');
  }
}).reopenClass({ positionalParams: ['option', 'nodeInfo']});
