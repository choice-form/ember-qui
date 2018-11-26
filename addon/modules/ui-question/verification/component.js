import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { set } from '@ember/object';
import { get } from '@ember/object';
import { tempI18n } from '../../helpers/temp-i18n';

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
        return tempI18n('UI_GetMsgCode');
      }
      if(verificationType == 'captcha' ){
        return tempI18n('UI_GetVerifyCode');
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
        if (countTime <= 0 || get(this, 'node').messageGetFailed) {
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
