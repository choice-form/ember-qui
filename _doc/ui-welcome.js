/**
 * 开始页面
 *
 * @class -welcome-page(开始页面)
 */

/**
 * onClick 事件, 点击进入答题
 *
 * @method handleNextClick
 */

/**
 * 问卷标题
 *
 * @property {String} title
 */

/**
 * 图片是否全屏
 *
 * @property {bool} bgImageMode
 */

/**
 * 内容文字
 *
 * @property {String} summary
 */

/**
 * 描述文字
 *
 * @property {String} description
 */

/**
 * images为数组对象,可以传多张图片
 *
 * @property {Object} images
 * @property {Number} images.ratio - 图片的显示比例
 * @property {String} images.natural - 原始图片的URL地址
 * @property {String} images.thumbnail - 缩列图URL地址
 * @example
 ```javascript
 images[
 {
  ratio: 0.667,
  natural: 'http://cform.io?uuqna712321202kks-720.jpg',
  thumbnail: 'http://cform.io?uuqna712321202kks-320.jpg',
 }
 ]
 ```
 */


/**
 * 图片显示类型 cover,no-cover、full-screen-cover
 *
 * @property {String} style
 *
 * @example
 ``` text
 bgImageMode: true,  //背景图片是否全屏
 ```
 */

/**
 * 点击后一题回调方法
 *
 * @method handleNextClick
 * @return {Promise} 会解析处理结果的Promise

 handleNextClick(){
    return new Promise();
  }
 */
