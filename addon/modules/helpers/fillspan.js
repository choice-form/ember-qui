import Helper from 'ember-helper'
import { htmlSafe } from 'ember-string'

export const fillspan = ([option,value]) => {
  const length = (option+'').length - (value+'').length;
  let content = '';
  for(let i = 0; i < length; i ++) {
    content += '0';
  }
  console.log(content);
  return htmlSafe(`<span style="opacity: 0; visibility: hidden">${content}</span>`);
};

export default Helper.helper(fillspan)
