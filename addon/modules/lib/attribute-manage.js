
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

  const hasimg =  new RegExp(/##\S+\?\S*##/);
  if(!hasimg.test(str)){
    return str;
  }

  return str.replace(/##\S*##/g,function (s) {
    let img = '';
    let width='';
    let height='';
    s.replace(/##.*(?=\?)/, function (str) {
      img = str.replace('##','');
    });

    s.replace(/\?w=.*(?=&h=)/, function (str) {
      width = str.replace('?w=','');
    });

    s.replace(/&h=.*(?=#\b)/, function (str) {
      height = str.replace('&h=','');
    });
    return `<img src="${img}" style="width:${width}px; height:${height}px">` ;
  })
}
