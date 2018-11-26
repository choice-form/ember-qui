import Component from '@ember/component';
import layout from './template';
import { set } from '@ember/object';
import { get } from '@ember/object';
import { reads } from '@ember/object/computed';
import { inject } from '@ember/service';

let countTime = 30;
export default Component.extend({
  layout,
  tagName:'',
  disclaimerService: inject("disclaimer"),
  //倒计时
  countDown: '30 sec',
  getInfoButton: true,
  handleEvents: reads('node.handleEvents'),

  actions: {
    /**
     * input
     */
    handleQuestionInput(e){
      const value = e.currentTarget.value;
      get(this, 'handleEvents').handleQuestionInput({phoneNumber: value}, get(this, 'node'));
    },

    /**
     * click
     */
    handleOptionClick(){
      //调用model方法
      const bool = get(this, 'handleEvents').handleOptionClick('', get(this, 'node'));
      if(!bool) return ;

      set(this, 'getInfoButton', false);
      this.time = setInterval(()=> {
        countTime--;
        set(this, 'countDown', `${countTime} sec`);
        if (countTime <= 0 || get(this, 'node').messageGetFailed) {
          countTime= 30;
          set(this, 'countDown', `${countTime} sec`);
          set(this, 'getInfoButton', true);
          clearInterval( this.time );
        }
      }, 1000);


    },

    handleNextClick(){
      get(this, 'handleEvents').handleNextClick(get(this,'node'));
    }
  },

  willDestroyElement(){
    this.time && clearInterval( this.time );
    countTime = 0;
  }

}).reopenClass({positionalParams: ['node']});
