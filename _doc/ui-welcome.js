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
 ``` text
 cover: 图片在文字上面 (type 可以为空)
 no-cover: 没有图片 (type 可以为空)
 full-screen-cover: 图片全屏当背景 (type : full-screen-cover)
 ```
 *
 * @property {String} type
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
