let $completeMenu = null;

let menu = null;

let owner = null;

let textarea = null;

let lastResizeStyle = '';

let scrollHandling = false;

let existed = null;


/**
 * 判断是否为移动端
 * @returns {*|jQuery}
 */
let isMobile = () => {
  const result = $('html').hasClass('mobile');
  isMobile = () => {
    return result;
  };
  return result;
};


/**
 * 处理滚动
 */
const handleScroll = () => {
  if (!scrollHandling) {
    window.requestAnimationFrame(() => {
      $completeMenu.attr('style', getStyle());
      scrollHandling = false;
    })
  }
  scrollHandling = true;
};

/**
 * 处理窗口尺寸变化事件
 */
const handleResize = () => {
  const style = getStyle();
  if (style === lastResizeStyle) {
    lastResizeStyle = '';
  } else {
    $completeMenu.attr('style', style);
    lastResizeStyle = style;
    setTimeout(handleResize, 100);
  }

};


/**
 * 处理选择事件
 * @param e
 */
const handleSelect = (e) => {
  if ($(e.target).hasClass('complete-option')) {
    const value = existed.concat(e.target.textContent).join(',');
    $(textarea).val(value).trigger('input');
    hide();
  }
};

/**
 * 捕捉鼠标落下事件
 * @param e
 */
const captureMouseDown = (e) => {
  if (e.target === owner.element
    || owner.element.contains(e.target)
    || e.target === menu
    || menu.contains(e.target)) {
    return;
  }
  hide();
};

/**
 * 匹配规则
 * @type {object}
 */
const matchRules = {
  'partial': (value, targetValue) => targetValue.indexOf(value) > -1,
  'start': (value, targetValue) => targetValue.indexOf(value) === 0,
  'full': (value, targetValue) => targetValue === value,
};


/**
 * 匹配文字和提示
 * @param {Array} valueList 文字列表
 * @param {string} name 名称
 * @param {Array} triggers 触发别名列表
 * @param {Array} existed 触发别名列表
 * @param {string} rule 匹配规则
 * @returns {boolean}
 */
const matchText = (valueList, {name, triggers}, existed, rule = 'full') => {
  const match = matchRules[rule];
  return valueList.some(value => {
    return existed.indexOf(name) < 0
      &&
      (
        match(value.toLowerCase(), name) ||
        triggers.some(trigger => match(value, trigger.toLowerCase()))
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
  if (list.length > 1) {
    text = list.pop();
    existed = list;
  } else {
    existed = [];
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
 * @param {string} rule 匹配规则
 * @returns {string}
 */
const searchResults = (text, dataSource, rule) => {
  const {value, existed} = analyzeValue(text);
  if (value) {
    return dataSource.reduce((rs, config) => {
      // 拼音输入法下面输入时字母间可能有空格或'号
      const matched = matchText([value, value.replace(/['\s]/g, '')], config, existed, rule);
      matched && (rs += `<div class="complete-option">${config.name}</div>`);
      return rs;
    }, '');
  }
  return '';
};


/**
 * 获得菜单样式
 * @returns {*}
 */
const getStyle = () => {
  const rect = owner.element.getBoundingClientRect();
  const style = {
    left: rect.left - 8,
    'max-width': rect.width,
    top: rect.bottom,
  };
  return Object.keys(style).reduce((rs, key) => {
    return rs + `${key}:${style[key]}px;`
  }, '');
};


/**
 * 初始化自动提示菜单
 */
const init = () => {
  if (!$completeMenu) {
    $completeMenu = $('<div class="auto-complete-menu"></div>').hide();
    menu = $completeMenu[0];
    $(document.body).append($completeMenu);
    $completeMenu.on('click', handleSelect);
  }
};


/**
 * 隐藏自动提示菜单
 */
const hide = () => {
  $completeMenu.hide().empty();
  owner = null;
  textarea = null;
  window.removeEventListener('mousedown', captureMouseDown, true);
  isMobile() && window.removeEventListener('resize', handleResize);
  window.removeEventListener('scroll', handleScroll);
};


/**
 * 召唤自动提示菜单
 * @param {Component} component 触发源组件
 * @param {HTMLInputElement} inputElem 触发源输入框
 * @param {Array} dataSource 内容匹配元数据
 * @param {string} rule 匹配规则 partial: 任意部分匹配, start:从头开始部分匹配, full:全部匹配
 */
export const autoComplete = (component, inputElem, dataSource, rule) => {
  init();
  const result = searchResults(inputElem.value, dataSource, rule);
  if (result) {
    owner = component;
    textarea = inputElem;
    $completeMenu.empty().append(result)
      .attr('style', getStyle())
      .show();
    window.addEventListener('mousedown', captureMouseDown, true);
    window.addEventListener('scroll', handleScroll);
    isMobile() && window.addEventListener('resize', handleResize);
  } else {
    $completeMenu.hide();
  }
};

