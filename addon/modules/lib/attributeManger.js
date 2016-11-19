export function addClass(element, className){
  const oldClass = element.getAttribute('class');
  const newClass = `${oldClass} ${className}`;
  element.setAttribute('class', newClass);
};
