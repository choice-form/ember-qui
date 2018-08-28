import $ from 'jquery';
import mobiscroll from 'mobiscroll'

import { tempI18n } from '../helpers/temp-i18n';

const zh = mobiscroll.i18n.zh;

if(zh){
  zh.labels = ["年","月","天","小时","分钟","秒",""];
  zh.labelsShort = ["年","月","天","时","分","秒",""];
}


const isDeskTop = function () {
  return $('html').hasClass('desktop');
};

const mobInfo = {
  lang: localStorage.getItem("language") || 'zh',
  display: 'bottom', //默认 bottom 其他有 top,modal 等
  mode: 'Scroller', // 默认是Scroller ,其他有Mixed
  theme: '', //默认"android-holo"
};


const timeSpanMaps = {
  '1': 'dd',
  '2': 'ddhh',
  '3': 'ddhhii',
  '4': 'hh',
  '5': 'hhii',
  '6': 'hhiiss',
};

const mScroll = {
  /**
   * 用mobile库把input控件初始化为日期选择控件
   * @param {Element} input
   * @param {object} config
   */
  'date': (input, config) => {
    const {_grade} = config;
    const dateFormat = ((_grade === 1) && 'yyyy') || ((_grade === 2) && 'yyyy-mm') || ((_grade === 3) && 'yyyy-mm-dd') || 'yyyy-mm-dd'; // 日期格式
    const dateOrder = ((_grade === 1) && 'yyyy') || ((_grade === 2) && 'yyyymm') || ((_grade === 3) && 'yyyymmdd') || 'yyyymmdd'; // 日期格式
    mobiscroll.date(input, {
      preset: 'date', //日期，可选：date\datetime\time\tree_list\image_text\select
      theme: mobInfo.theme, //皮肤样式，可选：default\android\android-ics light\android-ics\ios\jqm\sense-ui\wp light\wp
      mode: mobInfo.mode, //日期选择模式，可选：scroller\clickpick\mixed
      lang: mobInfo.lang,
      showNow: true,
      ...config,
      display: isDeskTop() ? 'center' : config.display || mobInfo.display,
      dateFormat,
      dateOrder,
    });
  },


  /**
   * 用mobile库把input控件初始化为日期范围选择控件
   * @param {Element} input
   * @param {object} config
   */
  "dateRange": (input, config) => {
    mobiscroll.range(input, {
      theme: mobInfo.theme,
      lang: mobInfo.lang,
      ...config,
      display: isDeskTop() ? 'center' : config.display || mobInfo.display,
    });
  },

  /**
   * 用mobile库把input控件初始化为时间选择控件
   * @param {Element} input
   * @param {object} config
   */
  "time": (input, config) => {
    mobiscroll.time(input, {
      theme: mobInfo.theme,
      lang: mobInfo.lang,
      timeFormat: 'HH:ii',
      timeWheels: 'HHii',
      headerText: false,
      ...config,
      display: isDeskTop() ? 'center' : config.display || mobInfo.display,
    });
  },


  /**
   * 用mobile库把input控件初始化为时间范围选择控件
   * @param {Element} input
   * @param {object} config
   */
  "timeRange": (input, config) => {
    mobiscroll.range(input, {
      theme: mobInfo.theme,
      lang: mobInfo.lang,
      controls: ['time'],
      maxWidth: 100,
      ...config,
      display: isDeskTop() ? 'center' : config.display || mobInfo.display,
    });
  },

  "float": (input, config) => {
    mScroll["numpad"](input, {
      ...config,
      scale: config._scale || 2,
    });
  },

  "int": (input, config) => {
    mScroll["numpad"](input, {
      ...config,
      scale: 0,
    });
  },
  "numpad": (input, config) => {
    mobiscroll.numpad(input, {
      theme: mobInfo.theme,
      lang: mobInfo.lang,
      preset: 'decimal',
      thousandsSeparator: '',
      decimalSeparator: '.',
      ...config,
      display: isDeskTop() ? 'center' : config.display || mobInfo.display,
      min: -999999999999999,
      max: 999999999999999
    });
  },
  "timeSpan": (input, config) => {
    const {_timeGrade} = config;
    const wheelOrder = timeSpanMaps[_timeGrade] || 'hhiiss';
    mobiscroll.timespan(input, {
      theme: mobInfo.theme,
      lang: mobInfo.lang,
      ...config,
      display: isDeskTop() ? 'center' : config.display || mobInfo.display,
      wheelOrder,
    })
  }
};

function mobiInit(input, config) {
  const init = mScroll[config.type];
  init && init(input, config);
}

/**
 * 用mobile库把input控件初始化选择树
 * @param {object} list
 * @param {object} config
 */
export function mobiInitTreeList(list, config = {}) {
  config = {
    theme: mobInfo.theme,
    lang: mobInfo.lang,
    circular: [false, false, false],
    ...config,
    display: isDeskTop() ? 'center' : config.display || mobInfo.display,
  };
  mobiscroll.treelist(list, config);
}


export const initSelect = (list, config = {}) => {
  config = {
    theme: mobInfo.theme,
    lang: mobInfo.lang,
    placeholder: tempI18n('UI_ClickToSelect'),
    ...config,
    display: isDeskTop() ? 'center' : config.display || mobInfo.display,
  };
  mobiscroll.select(list, config);
};


export default mobiInit;
