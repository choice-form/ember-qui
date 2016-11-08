import Component from 'ember-component';
import layout from './template';
import computed from 'ember-computed';
import set from 'ember-metal/set';
import get from 'ember-metal/get';

let countTime = 30;
export default Component.extend({
  layout,
  classNames: ['ui-verification'],
  attributeBindings: ['data-render-id'],
  'data-render-id': computed.oneWay('node.renderId'),

  //用户手机号
  phoneNumber: '',

  //验证按钮的切换
  captchaButton: true,

  //倒计时
  countDown: '30秒',


  actions: {

    /**
     * Message验证
     */
    handleOptionInput_SMS(e){
      const value = e.currentTarget.value;
      //set(this, 'phoneNumber', value);
      this.handleEvents.handleQuestionInput({phoneNumber: value}, get(this, 'node'));
    },

    handleOptionClick_SMS(){
      //给接口发送手机号码
      this.handleEvents.handleOptionClick(get(this, 'phoneNumber'), get(this, 'node'));
    },

    /**
     * password验证
     */
    handleOptionInput_Password(e){
      const value = e.currentTarget.value;
      this.handleEvents.handleQuestionInput(value, get(this, 'node'));
    },

    /**
     * captcha验证
     */
    handleOptionClick_captcha(){
      set(this, 'captchaButton', false);
      let t1 = setInterval(()=> {
        countTime--;
        set(this, 'countDown', `${countTime}秒`);
        if (countTime <= 0) {
          countTime= 30;
          set(this, 'countDown', `${countTime}秒`);
          set(this, 'captchaButton', true);
          clearInterval(t1);
        }
      }, 1000);

      //请求获取验证码
      this.handleEvents.handleOptionClick('', get(this, 'node'));
    },
  }



}).reopenClass({positionalParams: ['node', 'handleEvents']});
