import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import inject from 'ember-service/inject';

export default Component.extend({
  layout,
  disclaimerService: inject("disclaimer"),
  classNames: ['submit-actions'],

  actions:{
    handlePrevClick() {
      get(this, 'handlePrevClick')();
    },

    handleNextClick() {

      const disclaimerService = get(this, 'disclaimerService');
      if(disclaimerService.disclaimer){
        get(this, 'handleNextClick')(true);
      }else{
        get(this, 'handleNextClick')(false);
      }

    }
  }
});




