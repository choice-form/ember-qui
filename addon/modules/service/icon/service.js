import Service from 'ember-service';
import inject from 'ember-service/inject';
import {htmlSafe} from 'ember-string';
import RSVP from 'rsvp';
import $ from 'jquery';

export default Service.extend({
  ajax: inject(),
  /*
   获取选项的Icon
   */
  getOptionSvg(slected, icon) {
    if(!icon){
      return false;
    }
    const  svgName = slected ? `${icon}-active` : icon;
    return htmlSafe(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
        <use xlink:href=#${svgName}></use>
      </svg>`);
  },

  /**
   * 是否为合理网址格式
   * @param {string} value 需要验证的值
   * @returns {boolean}
   */
  isURL(value) {
    return /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.test(value);
  },

  table: {},

  getIconByUrl(url) {
    let icon = this.table[url];
    if (icon) {
      return RSVP.resolve(icon)
    }
    if (!this.isURL(url)) {
      return null;
    }

    return $.ajax(url).then(res => {
      const elem = res.children[0];
      this.table[url] = elem.style.display='block';
      return elem;
    });
  },
});
