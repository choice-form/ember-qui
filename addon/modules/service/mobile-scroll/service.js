import Service from 'ember-service'
import get from 'ember-metal/get';

export default Service.extend({

  mobInfo: {
    display: 'bottom', //默认 bottom 其他有 top,modal 等
    mode: 'Scroller', // 默认是Scroller ,其他有Mixed
    theme: 'choice-form', //默认"android-holo"
  },

  // 只会处理一下几种输入验证类型
  willHandleInputTypes: ['date', 'time', 'timeRange', 'dateRange'],

  mobile: {

    /**
     * 用mobile库把input控件初始化为日期选择控件
     * @param {Element} input
     * @param {object} config
     */
    'date': (input, config) => {
      const currYear = (new Date()).getFullYear();
      config = {
        preset: 'date', //日期，可选：date\datetime\time\tree_list\image_text\select
        theme: mobInfo.theme, //皮肤样式，可选：default\android\android-ics light\android-ics\ios\jqm\sense-ui\wp light\wp
        display: mobInfo.display, //显示方式 ，可选：modal\inline\bubble\top\bottom
        mode: mobInfo.mode, //日期选择模式，可选：scroller\clickpick\mixed
        lang: mobInfo.lang,
        dateFormat: 'yyyy-mm-dd', // 日期格式
        dateOrder: 'yyyymmdd', //面板中日期排列格式
        showNow: true,
        startYear: currYear - 200, //开始年份
        endYear: currYear + 100, //结束年份
        ...config
      };

      $(input).mobiscroll().date({
        ...config,
        onSet: (event, inst) => {
          input.dispatchEvent(new Event('input', {bubbles: true}));
          config.onSet && config.onSet(event, inst);
        },
      });
    },


    /**
     * 用mobile库把input控件初始化为日期范围选择控件
     * @param {Element} input
     * @param {object} config
     */
    "dateRange" : (input, config) => {
      $(input).mobiscroll().range({
        theme: mobInfo.theme,
        lang: mobInfo.lang,
        display: mobInfo.display,
        ...config,
        onSet: (event, inst) => {
          input.dispatchEvent(new Event('input', {bubbles: true}));
          config.onSet && config.onSet(event, inst);
        },
      });
    },

    /**
     * 用mobile库把input控件初始化为时间选择控件
     * @param {Element} input
     * @param {object} config
     */
    "time": (input, config) => {
      $(input).mobiscroll().time({
        theme: mobInfo.theme,
        lang: mobInfo.lang,
        display: mobInfo.display,
        timeFormat: 'HH:ii',
        timeWheels: 'HHii',
        headerText: false,
        ...config,
        onSet: (event, inst) => {
          input.dispatchEvent(new Event('input', {bubbles: true}));
          config.onSet && config.onSet(event, inst);
        },
      });
    },


    /**
     * 用mobile库把input控件初始化为时间范围选择控件
     * @param {Element} input
     * @param {object} config
     */
    "timeRange": (input, config) => {
      $(input).mobiscroll().range({
        theme: mobInfo.theme,
        lang: mobInfo.lang,
        display: mobInfo.display,
        controls: ['time'],
        maxWidth: 100,
        ...config,
        onSet: (event, inst) => {
          input.dispatchEvent(new Event('input', {bubbles: true}));
          config.onSet && config.onSet(event, inst);
        },
      });
    }
  },


  initInput (input, config) {
    const {type} = config;
    if (get(this, 'this.willHandleInputTypes').indexOf(type) < 0 || !input) {
      return;
    }
    // 该家伙之前已经被初始化为该类型了
    if (input.cformValidateType == type) {
      return;
    }

    get(this, 'mobile')[type](input, config);
    // 标记
    input.cformValidateType = type;
  }

});
