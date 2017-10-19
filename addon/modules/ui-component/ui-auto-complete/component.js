import Component from 'ember-component';
import layout from './template';
import {htmlSafe} from 'ember-string';
import {autoComplete} from '../../services/auto-complete';

export default Component.extend({
  layout,
  classNames: ['ui-auto-complete'],
  $dropContainer: null,
  actions: {
    ipTextarea(e){
      if (e.isTrigger) {
        e.currentTarget = e.target;
      } else {
        autoComplete(this, e.target, this.completeGroups);
      }
      this.oninput(e);
    },
  },

});
