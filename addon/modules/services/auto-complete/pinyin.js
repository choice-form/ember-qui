import pinyin from 'pinyin';


const nasalMap = [
  {normal: 'an', velar: 'ang'},
  {normal: 'en', velar: 'eng'},
  {normal: 'in', velar: 'ing'},
  {normal: 'on', velar: 'ong'},
];


/**
 * 混淆鼻音,所有的后鼻音都会变成前鼻音
 * @param {string} pyText 拼音字符,只能接收单个字的拼音
 */
const mixNasal = (pyText) => {
  nasalMap.forEach(function (nasal) {
    pyText = pyText.replace(nasal.velar, nasal.normal);
  });
  return pyText;
};

/**
 * 获得汉字拼音,如果不是汉字则返回null
 * 会返回混淆鼻音后的拼音以及首字母
 * @param text
 * return {{pinyin:string, py:string}}
 */
export const getPinyin = (text) => {
  if(!text.match(/[\u4e00-\u9fa5]/)){
    return null;
  }
  const ch = text.replace(/[^\u4e00-\u9fa5]/g, '');
  let full = '';
  let mix = '';
  let head = '';
  pinyin(ch, {style: pinyin.STYLE_NORMAL}).forEach(function (singlePy) {
    singlePy = singlePy.join('');
    full += singlePy;
    mix += mixNasal(singlePy);
    head += singlePy[0];
  });
  return {
    full,
    mix,
    head,
  };
};
