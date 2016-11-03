/**
 * 开始页面
 *
 * @class WelcomePage
 * @author 盛星星
 */

model = {
  /**
   * 问卷标题文字
   *
   * @property {String} title
   * @required
   */
  title: '标题',
  /**
   * 开始页面内容文字
   *
   * @property summary {String}
   */
  summary: '内容',
  /**
   * 开始页面描述文字
   *
   * @property {String} description
   */
  description: '描述',
  images: [
    /**
    * 问卷首页图片
    *
    * @property image {Object} - 图片对象
    * @property image.ratio {Number} - 比例
    * @property image.natural {String} - 原始图
    * @property image.thumbnail {String} - 缩略图
    */
    {
      ratio: 0.6666667,
      natural: '/images/sample-1.jpg',
      thumbnail: '/images/sample-1-thumbnail.jpg',
    }
  ],
}

/**
 * 测试
 *
 * @class Test
 */
