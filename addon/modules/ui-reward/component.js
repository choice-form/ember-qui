import Component from 'ember-component';
import layout from './template';
import set from 'ember-metal/set';
import get from 'ember-metal/get';
import computed, {reads} from 'ember-computed';
import inject from 'ember-service/inject';

let countTime = 30;
export default Component.extend({
  layout,
  tagName:'',

  disclaimerService: inject("disclaimer"),


  //倒计时
  countDown: '30 sec',
  //
  getInfoButton: true,

  handleEvents: reads('node.handleEvents'),


  qrImageCode:computed('node.qrImageCode', function () {


  }),

  canSendMessage: false,


  actions: {

    /**
     * input
     */
    handleQuestionInput(e){
      const value = e.currentTarget.value;
      const bool = get(this, 'handleEvents').handleQuestionInput({phoneNumber: value}, get(this, 'node'))
      set(this, 'canSendMessage', bool);
    },

    /**
     * click
     */
    handleOptionClick(){
      const canSendMessage = get(this, 'canSendMessage');
      if(!canSendMessage){
        return ;
      }
      set(this, 'getInfoButton', false);
      let t1 = setInterval(()=> {
        countTime--;
        set(this, 'countDown', `${countTime} sec`);
        if (countTime <= 0) {
          countTime= 30;
          set(this, 'countDown', `${countTime} sec`);
          set(this, 'getInfoButton', true);
          clearInterval(t1);
        }
      }, 1000);

      //调用model方法
      get(this, 'handleEvents').handleOptionClick('', get(this, 'node'));
    },

    handleNextClick(){
      get(this, 'handleEvents').handleNextClick(get(this,'node'));
    }
  }
}).reopenClass({positionalParams: ['node']});
