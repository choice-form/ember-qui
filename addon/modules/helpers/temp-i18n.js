import { helper } from '@ember/component/helper';

const en = {
  'UI_TransVideo': 'Encoding video...',
  'UI_Retry': 'Please try again.',
  'UI_Count': 'awards',
  'UI_WeightHint': 'Weight value indicator',
  'UI_ScreenPrint': 'Please take a screenshot and save it.',
  'UI_GetMessage': 'Get short text message',
  'UI_GiftIntro': 'Statement of red envelope award delivery：',
  'UI_GiftIn24Hs': 'Red envelope award will to delivered to your account in 24 hours。Please keep track of the notification.',
  'UI_InputVerifyCode': 'Please enter verification code.',
  'UI_InputPhoneNum': 'Please enter your phone number.',
  'UI_GetInfo': 'Get information',
  'UI_GetMsgCode': 'Get verification code.',
  'UI_GetVerifyCode': 'Get verification code.',
  'UI_LocateSuccess': 'Success to get location！',
  'UI_ClickToLocate': 'Click to get location.',
  'UI_LocateFailed': 'Fail to get location！！',
  'UI_Located': 'Success to get location！',
  'UI_Locating': 'Locating...',
  'UI_AllowLocate': 'Allow to get location？',
  'UI_Upload': 'Upload file',
  'UI_ReUpload': 'Re-upload',
  'UI_GetGiftIn15Min': 'Please go to lottary in 15 minutes.',
  'UI_InputPsw': 'Please enter password',
  'UI_InputVerifyContent': 'Please enter comtent to be varified.',
  'UI_GoToCForm': 'Go to choicefom?',
  'UI_ClickToSelect': 'Please click to select.',
  'UI_SelMaxLimit': '#v1#:can select #v2# items at most',
  'UI_TopList': 'Top list',
  'UI_ListItem': 'List item',
  'UI_ScanQrCode': 'Scan qr code via wechat to get gift',
  'UI_PlaceholderTitle': 'Enter your question',
  'UI_PlaceholderEnd': 'You can add a Custom Thank You to the end of your survey',
  'UI_PlaceholderRewardTitle': 'Enter your title',
  'UI_PlaceholderRewardMessage': 'You can add a custom message to the rewards page',
  'UI_PlaceholderChoice': 'Enter an answer choice',
};

const zh = {
  'UI_TransVideo': '视频正在解码中，请稍后再试。',
  'UI_Retry': '请重试',
  'UI_Count': '份',
  'UI_WeightHint': '权重指示',
  'UI_ScreenPrint': '请截屏进行保存',
  'UI_GetMessage': '通过手机号获取信息',
  'UI_GiftIntro': '红包发放说明：',
  'UI_GiftIn24Hs': '24小时内，红包会发到您的账户。您在收到微信红包通知后即可领取。',
  'UI_InputVerifyCode': '请输入验证码',
  'UI_InputPhoneNum': '请输入手机号',
  'UI_GetInfo': '获取信息',
  'UI_GetMsgCode': '获取短信验证码',
  'UI_GetVerifyCode': '获取验证码',
  'UI_LocateSuccess': '定位成功！',
  'UI_ClickToLocate': '点击获取位置信息',
  'UI_LocateFailed': '定位失败！',
  'UI_Located': '成功获取位置信息',
  'UI_Locating': '正在获取位置信息...',
  'UI_AllowLocate': '是否允许使用定位？',
  'UI_Upload': '上传文件',
  'UI_ReUpload': '重新上传',
  'UI_GetGiftIn15Min': '抽奖与领奖的有效时间为15分钟，请在结束答卷后15分钟内前往。',
  'UI_InputPsw': '请输入密码',
  'UI_InputVerifyContent': '请输入待验证内容',
  'UI_GoToCForm': '是否跳转到巧思科技主页？',
  'UI_ClickToSelect': '请点击选择...',
  'UI_SelMaxLimit': '#v1#:最多只能选中#v2#项',
  'UI_TopList': '顶层列表',
  'UI_ListItem': '列表项',
  'UI_ScanQrCode': '截图保存二维码，微信扫描二维码领取微信红包奖励。',
  'UI_PlaceholderTitle': '请输入问题',
  'UI_PlaceholderEnd': '请输入结束语',
  'UI_PlaceholderRewardTitle': '请输入活动名称',
  'UI_PlaceholderRewardMessage': '请输入祝福语',
  'UI_PlaceholderChoice': '请输入选项文字',

};

const languages = {
  en,
  zh,
};

export const tempI18n = (name, ...replacements) => {
  const code = localStorage.getItem('language');
  let lang = languages[code];
  if (!lang) {
    lang = languages.zh;
  }
  let result = lang[name];
  if (replacements.length > 0) {
    replacements.forEach((replacement, index) => {
      const type = typeof replacement;
      if(type === 'string' || type === 'number'){
        result = result.replace(new RegExp(`#v${index + 1}#`, 'g'), replacement);
      }
    });
  }
  return result;
};

export default helper(tempI18n);
