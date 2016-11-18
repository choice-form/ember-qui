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
        return "Get verification code"
      }
      if(verificationType == 'captcha' ){
        return "Get captcha code"
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
      this.handleEvents.handleOptionClick('', get(this, 'node'));
    },
  },


}).reopenClass({positionalParams: ['node', 'handleEvents']});
