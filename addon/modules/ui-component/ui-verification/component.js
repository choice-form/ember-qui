import Component from 'ember-component';
import computed from 'ember-computed';
import set from 'ember-metal/set';
import get from 'ember-metal/get';
import layout from './template';

let countTime = 5;

export default Component.extend({

  layout,
  tagName:'',
  size: '64px',
  viewBox: '40',

  icon:'',

  //用户手机号
  phoneNumber: '',

  //验证按钮的切换
  getInfoButton: true,

  //倒计时
  countDown: '30秒',

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
     * Message验证
     */
    handleOptionInput(e){
      const value = e.currentTarget.value;
      const verificationType = get(this, 'node.verificationType');

      if(verificationType == 'sms'){
        set(this, 'phoneNumber', value);
        this.handleEvents.handleQuestionInput({phoneNumber: value}, get(this, 'node'));
      }else{
        this.handleEvents.handleQuestionInput(value, get(this, 'node'));
      }
    },

    handleOptionClick_SMS(){
      //给接口发送手机号码
      this.handleEvents.handleOptionClick(get(this, 'phoneNumber'), get(this, 'node'));
    },

    /**
     * password验证
     */
    handleOptionInput_Password(e){

    },

    /**
     * captcha验证
     */
    handleOptionClick_captcha(){
      set(this, 'getInfoButton', false);
      let t1 = setInterval(()=> {
        countTime--;
        set(this, 'countDown', `${countTime}秒`);
        if (countTime <= 0) {
          countTime= 30;
          set(this, 'countDown', `${countTime}秒`);
          set(this, 'getInfoButton', true);
          clearInterval(t1);
        }
      }, 1000);

      //请求获取验证码
      this.handleEvents.handleOptionClick('', get(this, 'node'));
    },
  },


  didReceiveAttrs(){
    const node = this.node;
    const verificationType = node.verificationType;
    set(this, 'verificationType', verificationType);
    set(this,'icon', verificationType);
  },

}).reopenClass({positionalParams: ['node', 'handleEvents']});
