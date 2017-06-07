import Helper from 'ember-helper'

const en = {
};

const zh = {
};

const languages = {
  en,
  zh,
};

export const tempI18n = (name) => {
  const code = localStorage.getItem('language');
  let lang = languages[code];
  if(!lang){
    lang = languages.zh;
  }
  return lang[name]
};

export default Helper.helper(tempI18n);
