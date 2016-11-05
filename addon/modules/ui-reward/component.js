import Component from 'ember-component';
import layout from './template';
import set from 'ember-metal/set';
import get from 'ember-metal/get';

export default Component.extend({
  layout,
  tagName:'',
  actions: {
    handleClick() {
      set(this, 'currency', true)
    },

    handleNextClick(){
      this.node.handleEvents.handleNextClick(get(this,'node'));
    }

  }
}).reopenClass({ positionalParams: ['node'] });
