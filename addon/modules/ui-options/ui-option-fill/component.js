import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {isPresent} from 'ember-utils';
import {htmlSafe} from 'ember-string';
import inject from 'ember-service/inject';


export default Component.extend({
  layout,
  uiService: inject('ui'),

  classNames: ['ui-option-cell'],

  actions: {
    change(e){
      const value = e.target.value;
      console.log(value);
      set(this, 'option.value', value);
    },
  },


  optionSvg: computed('option.icon', function () {
    const svgName = get(this,'option.icon');
    return htmlSafe(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
        <use xlink:href=${svgName}></use>
      </svg>`);
  }),

  didInsertElement() {
  }

}).reopenClass({ positionalParams: ['option', 'nodeInfo']});
