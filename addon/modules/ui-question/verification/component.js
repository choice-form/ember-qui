import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import set from 'ember-metal/set';
import get from 'ember-metal/get';

let countTime = 30;
export default Component.extend({
  layout,


  //用户手机号
  phoneNumber: '',
  //验证按钮的切换
  getInfoButton: true,
  //倒计时
  countDown: '30 sec',

  captchaClass:computed('node.verificationType', function () {
    const verificationType = get(this, 'node.verificationType');
    return  verificationType == 'captcha' ? " captcha" : "";
  }),

  buttonText:computed('node.verificationType', 'getInfoButton', function () {
    const verificationType = get(this, 'node.verificationType');
    const getInfoButton = get(this,'getInfoButton');

    if(getInfoButton){
      if(verificationType == 'sms' ){
        return "获取短信验证码"
      }
      if(verificationType == 'captcha' ){
        return "获取验证码"
      }
    }

  }),

  actions: {
    /**
     * click
     */
    handleOptionInput(e){
      const value = e.currentTarget.value;

      if(e.currentTarget.type == 'tel'){
        set(this, 'phoneNumber', value);
       this.handleEvents.handleQuestionInput({phoneNumber: value}, get(this, 'node'));
      }else{
        this.handleEvents.handleQuestionInput({code: value}, get(this, 'node'));
      }

    },

    /**
     * input
     */
    handleOptionClick(){
      //调用model方法
      const bool = this.handleEvents.handleOptionClick('', get(this, 'node'));
      //如果手机号输入有误，是不能获取验证码的
      if(!bool) return ;

      const verificationType = get(this, 'node.verificationType');
      if(verificationType == 'captcha') return;

      set(this, 'getInfoButton', false);
      this.time = setInterval(()=> {
        countTime--;
        set(this, 'countDown', `${countTime} sec`);
        if (countTime <= 0) {
          countTime= 30;
          set(this, 'countDown', `${countTime} sec`);
          set(this, 'getInfoButton', true);
          clearInterval( this.time );
        }
      }, 1000);
    },
  },

  willDestroyElement(){
    countTime = 0;
    this.time && clearInterval(this.time);
  }

}).reopenClass({positionalParams: ['node', 'handleEvents']});
