/**
 *
 * @type {jQuery}
 */
let $completeMenu = null;

let menu = null;

let owner = null;

let textarea = null;

let lastResizeStyle = '';

let scrollHandling = false;


let isMobile = () => {
  const result = $('html').hasClass('mobile');
  isMobile = () => {
    return result;
  };
  return result;
};


const handleScroll = () => {
  if(!scrollHandling){
    window.requestAnimationFrame(()=>{
      $completeMenu.attr('style', getStyle());
      scrollHandling = false;
    })
  }
  scrollHandling = true;
};


const handleResize = () => {
  const style = getStyle();
  if(style === lastResizeStyle){
    lastResizeStyle = '';
  }else{
    $completeMenu.attr('style', style);
    lastResizeStyle = style;
    setTimeout(handleResize, 100);
  }

};

const handleSelect = (e) => {
  if ($(e.target).hasClass('complete-option')) {
    const value = e.target.textContent;
    $(textarea).val(value).trigger('input');
    hide();
  }
};


const captureMouseDown = (e) => {
  if (e.target === owner.element
    || owner.element.contains(e.target)
    || e.target === menu
    || menu.contains(e.target)) {
    return;
  }
  hide();
};

const matchText = (value, name, triggers) => {
  return name.toLowerCase().indexOf(value) == 0 ||
    triggers.some(trigger => trigger.toLowerCase().indexOf(value) == 0);
};


const searchResults = (value, dataSource) => {
  if (value) {
    value = value.toLowerCase();
    return dataSource.reduce((rs, {name, triggers}) => {
      // 拼音输入法下面输入时字母间可能有空格或'号
      const matched = matchText(value, name, triggers) ||
        matchText(value.replace(/['\s]/g, ''), name, triggers);
      matched && (rs += `<div class="complete-option">${name}</div>`);
      return rs;
    }, '');
  }
  return '';
};

const getStyle = () => {
  const rect = owner.element.getBoundingClientRect();
  const style = {
    left: rect.left - 8,
    'max-width': rect.width,
    top: rect.bottom,
  };
  const result = Object.keys(style).reduce((rs, key) => {
    return rs + `${key}:${style[key]}px;`
  }, '');

  console.log(result);

  return result;
};

const init = () => {
  if (!$completeMenu) {
    $completeMenu = $('<div class="auto-complete-menu"></div>').hide();
    menu = $completeMenu[0];
    $(document.body).append($completeMenu);
    $completeMenu.on('click', handleSelect);
  }
};

const hide = () => {
  $completeMenu.hide().empty();
  owner = null;
  textarea = null;
  window.removeEventListener('mousedown', captureMouseDown, true);
  isMobile() && window.removeEventListener('resize', handleResize);
  window.removeEventListener('scroll', handleScroll);
};


export const autoComplete = (component, inputElem, value, dataSource) => {
  init();
  const result = searchResults(value, dataSource);
  if (result) {
    owner = component;
    textarea = inputElem;
    $completeMenu.empty().append(result)
      .attr('style', getStyle())
      .show();
  }
  window.addEventListener('mousedown', captureMouseDown, true);
  window.addEventListener('scroll', handleScroll);
  isMobile() && window.addEventListener('resize', handleResize);
};

