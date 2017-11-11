
export function hasClass(obj, cls) {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

export function addClass(obj, cls) {
  if (!hasClass(obj, cls)) obj.className += " " + cls;
}

export function removeClass(obj, cls) {
  if (hasClass(obj, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    obj.className = obj.className.replace(reg, ' ');
  }
}

export function toggleClass(obj,cls){
  if(hasClass(obj,cls)){
    removeClass(obj, cls);
  }else{
    addClass(obj, cls);
  }
}

export function insertImg(str='') {
  // 防止有转义的&
  str = str.replace(/&(?:amp;)+/g, '&');
  return str.replace(/##(\S+?)\?w=(\d+)&h=(\d+).*?##/g, function (matched, url, width, height) {
    if(width == 0 && height == 0) return `<img src="${url}">`;
    const _width = width == 0 ? '' : `width:${width}px;`;
    const _height = height == 0 ? '' : `height:${height}px;`;
    return `<img src="${url}" style="${_width} ${_height}">`;
  });
}
