import { getPinyin } from './pinyin';

/**
 * 匹配规则
 * @type {object}
 */
export const matchRules = {
  'partial': (value, targetValue) => targetValue.indexOf(value) > -1,
  'start': (value, targetValue) => targetValue.indexOf(value) === 0,
  'full': (value, targetValue) => targetValue === value,
};

/**
 * 匹配文字,如果包含汉字的话会清除其他非汉字字符,并且将汉字转成拼音进行匹配
 * @param {string} value 值
 * @param {string} targetValue 对比目标值
 * @param {string} rule 匹配规则
 * @returns {boolean}
 */
const matchTextComplex = (value, targetValue, rule = 'full') => {
  const matchFn = matchRules[rule];
  const vPinyin = getPinyin(value);
  const tPinyin = getPinyin(targetValue);
  if (vPinyin && tPinyin) {
    // 当输入值为汉字切目标也为汉字,不要用拼音首字母匹配
    // 否则输入'八戒'会能匹配所有bj开的的词组,如暴君,布甲等.
    // 只有一边是汉字的时候才开启首字母匹配
    return matchFn(vPinyin.full, tPinyin.full) || matchFn(vPinyin.mix, tPinyin.mix);
  } else if (vPinyin) {
    return matchFn(vPinyin.full, targetValue) || matchFn(vPinyin.head, targetValue)
      || matchFn(vPinyin.mix, targetValue);
  } else if (tPinyin) {
    return matchFn(value, tPinyin.full) || matchFn(value, tPinyin.head)
      || matchFn(value, tPinyin.mix);
  } else {
    return matchFn(value, targetValue);
  }
};

/**
 * 简单匹配文字,完全匹配或者去掉空格后完全匹配
 * @param value
 * @param text
 * @returns {boolean}
 */
const matchTextSimple = (value, text) => {
  return value.toLowerCase().replace(/\s+/g, '') === text.toLowerCase().replace(/\s+/g, '');
};


/**
 * 匹配配置中的文字和提示
 * @param {Array} valueList 文字列表
 * @param {string} name 名称
 * @param {Array} triggers 触发别名列表
 * @param {Array} existed 触发别名列表
 * @param {string} rule 匹配规则
 * @param {boolean} simple 是否简单匹配
 * @returns {boolean}
 */
const matchConfig = (valueList, {name, triggers}, existed, rule, simple) => {
  name = String(name);
  const matchFn = simple ? matchTextSimple : matchTextComplex;

  return valueList.some(value => {
    return existed.indexOf(name) < 0
      &&
      (
        matchFn(value, name.toLowerCase(), rule) ||
        triggers.some(trigger => matchFn(value, String(trigger).toLowerCase(), rule))
      );
  });
};

/**
 * 分解搜索关键字获得用于匹配的值和已存在的项目
 * 尽量获取最后一个逗号的后面部分作为匹配值
 * @param {string} text 搜索关键字
 * @returns {{value:string, existed:Array}}
 */
const analyzeValue = (text) => {
  const list = text.split(/[,，]/g);
  let existed = [];
  if (list.length > 1) {
    text = list.pop();
    existed = list;
  }
  return {
    value: text.toLowerCase(),
    existed,
  }
};

/**
 * 搜索匹配结果
 * @param {string} text 搜索关键字
 * @param {Array} dataSource 搜索元数据
 * @param {string} rule 匹配规则,
 * @param {boolean} [simple] 是否简单匹配
 * @returns {Object}
 */
export const searchResult = (text, dataSource, rule, simple) => {
  const {value, existed} = analyzeValue(text);
  let result = [];
  if (value) {
    result = dataSource.reduce((rs, config) => {
      // 拼音输入法下面输入时字母间可能有空格或'号
      const matched = matchConfig([value, value.replace(/['\s]/g, '')], config, existed, rule, simple);
      matched && (rs.push({name: String(config.name), icon: config.icon}));
      return rs;
    }, []);
  }
  return {
    result,
    existed,
  }
};
