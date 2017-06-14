import mobiscroll from 'mobiscroll'
import {tempI18n} from '../helpers/temp-i18n';

const mobInfo = {
  lang: localStorage.getItem("language") || 'zh',
  display: 'bottom', //默认 bottom 其他有 top,modal 等
  mode: 'Scroller', // 默认是Scroller ,其他有Mixed
  theme: '', //默认"android-holo"
};

const mScroll = {
  /**
   * 用mobile库把input控件初始化为日期选择控件
   * @param {Element} input
   * @param {object} config
   */
  'date': (input, config) => {
    mobiscroll.date(input, {
      preset: 'date', //日期，可选：date\datetime\time\tree_list\image_text\select
      theme: mobInfo.theme, //皮肤样式，可选：default\android\android-ics light\android-ics\ios\jqm\sense-ui\wp light\wp
      display: mobInfo.display, //显示方式 ，可选：modal\inline\bubble\top\bottom
      mode: mobInfo.mode, //日期选择模式，可选：scroller\clickpick\mixed
      lang: mobInfo.lang,
      showNow: true,
      ...config,
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
      display: mobInfo.display,
      ...config,
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
      display: mobInfo.display,
      timeFormat: 'HH:ii',
      timeWheels: 'HHii',
      headerText: false,
      ...config,
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
      display: mobInfo.display,
      controls: ['time'],
      maxWidth: 100,
      ...config,
    });
  },

  "float": (input, config) => {
    if (config.max || config.min) {
      mobiscroll.number(input, {
        theme: mobInfo.theme,
        lang: mobInfo.lang,
        display: mobInfo.display,
        ...config,
      })
    } else {
      mScroll.numpad(input, {
        ...config,
        scale: 2,
      })
    }

  },

  "int": (input, config) => {
    if (config.max || config.min) {
      mobiscroll.number(input, {
        theme: mobInfo.theme,
        lang: mobInfo.lang,
        display: mobInfo.display,
        step: 1,
        ...config,
      })
    }
    else {
      mScroll.numpad(input, {
        ...config,
        scale: 0,
      })
    }
  },
  "numpad": (input, config) => {
    console.log(config);
    mobiscroll.numpad(input, {
      theme: mobInfo.theme,
      lang: mobInfo.lang,
      display: mobInfo.display,
      preset: 'decimal',
      thousandsSeparator: '',
      decimalSeparator: '.',
      min: -Infinity,
      max: Infinity,
      ...config,
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
    display: mobInfo.display,
    lang: mobInfo.lang,
    circular: [false, false, false],
    ...config
  };
  mobiscroll.treelist(list, config);
}


export const initSelect = (list, config = {}) => {
  config = {
    theme: mobInfo.theme,
    display: mobInfo.display,
    lang: mobInfo.lang,
    placeholder: tempI18n('UI_ClickToSelect'),
    ...config,
  };
  mobiscroll.select(list, config);
};


export default mobiInit;
