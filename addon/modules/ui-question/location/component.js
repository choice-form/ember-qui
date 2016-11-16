import Component from 'ember-component';
import computed from 'ember-computed';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {getLocation} from '../../lib/bMapApi';

export default Component.extend({
  layout,

  checked: false,

  tagName: '',


  //状态，location、positioning、location-successful、location-failed
  svgState: 'location',

  // 'positioning' 'successful' 'failed'
  locationState: '',

  tips: computed('svgState', function () {
    const state = get(this, 'svgState');
    if (state === 'positioning') {
      return 'Positioning...';
    }
    if (state === 'location-successful') {
      return "Successful";
    }
    if (state === 'location-failed') {
      return "Failed, Please";
    }
    return "Where are you?";
  }),


  actions: {
    /**
     * click事件
     */
    handleOptionClick(){
      set(this, 'svgState', 'positioning');
      set(this, 'locationState', 'positioning');
      getLocation()
        .then((position) => {
          this.handleEvents.handleQuestionInput(position, get(this,'node'));
          set(this, 'svgState', 'location-successful');
          set(this, 'locationState', 'successful');
        }).catch(()=> {
        set(this, 'svgState', 'location-failed');
        set(this, 'locationState', 'failed');
      });
    },
  },

}).reopenClass({positionalParams: ['node', 'handleEvents']});
