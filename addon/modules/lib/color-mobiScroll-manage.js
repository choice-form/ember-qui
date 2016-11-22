import colorAlpha from './color-transform';

/* eslint-disable no-unused-vars */
export default function mobiScrollStyle(primary = 'rgba(128,128,128,1)', secondary = 'rgba(255,255,255,1)', contrast = 'rgba(202,32,39,1)') {

  const selectedColor = contrast;
  const color = colorAlpha(primary, 0.5);
  const background = secondary;
  const shallowBackground = colorAlpha(contrast, 0.3);

  /**
   * 列表滚动的上下边框线
   * @type {string}
   */
  const mbscScWhll = `.mbsc-sc-whl-l{
      border-top: 1px solid ${selectedColor} !important;
      border-bottom: 1px solid ${selectedColor} !important;
  }`;

  /**
   * 基础设置, 主背景颜色,文字颜色
   * @type {string}
   */
  const baseColor = `.mbsc-fr-w{
        background-color: ${background} !important;
        color: ${color} !important;
  }`;

  /**
   * 选项点击的背景色
   * @type {string}
   */
  const activeBackground = `.mbsc-sc-itm.mbsc-btn-a{
        background-color: ${shallowBackground} !important;
   }`;

  /**
   * 提交按钮的文字颜色,背景颜色
   * @type {string}
   */
  const submitButton = `.mbsc-fr-btn{
        color: ${selectedColor} !important;
  }
  .mbsc-fr-btn-a{
        background-color: ${shallowBackground} !important;
  }`;


  /**
   * 提交按钮的文字颜色,背景颜色
   * @type {string}
   */
  const tableButton = `.mbsc-range-btn-sel .mbsc-range-btn{
        color: ${background} !important;
        background-color: ${selectedColor} !important;
  }
  .mbsc-range-btn {
        border-color: ${selectedColor} !important;
  }`;


  /**
   * 左右箭头颜色
   * @type {string}
   */
  const arrow = `.mbsc-cal-btn-txt{
    color: ${selectedColor} !important;
  }`;

  /**
   * 显示日期的星期几标题
   * @type {string}
   */
  const titleData = `.mbsc-cal-days{
        color: ${selectedColor} !important;
  }
  .mbsc-cal-days th{
        border-color: ${selectedColor} !important;
  }`;


  /**
   * 选择的选项Item
   * @type {string}
   */
  const selectItem = `.mbsc-range .mbsc-cal-table .mbsc-cal-day-hl .mbsc-cal-day-i{
        background-color: ${selectedColor} !important;
        color: ${background} !important;
  }`;


  /**
   * 用于范围选择的中间Item, 颜色变淡
   * @type {string}
   */
  const selectRangeItem = `.mbsc-range .mbsc-cal-table .mbsc-cal-day-sel .mbsc-cal-day-i {
      color: ${color} !important;
      background-color: ${shallowBackground} !important;
  }`;

  /**
   * 当前日期颜色
   * @type {string}
   */
  const currentDate = `.mbsc-cal-hl-now .mbsc-cal-today{
        color: ${selectedColor} !important;
  }`;

  const selectYear = `.mbsc-cal .mbsc-cal-day-sel .mbsc-cal-day-i, .mbsc-cal .mbsc-cal-sc-sel .mbsc-cal-sc-cell-i{
        background: ${selectedColor} !important;
        color: ${background} !important;
  }`;

  const styles = mbscScWhll + baseColor + activeBackground + submitButton + tableButton + arrow + titleData + selectRangeItem + selectItem + currentDate + selectYear;

  document.getElementById('mobiScrollStyle').innerText = styles;
}




