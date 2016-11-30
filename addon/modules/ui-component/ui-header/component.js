import Component from 'ember-component';
import layout from './template';
import computed, { notEmpty, and, not } from 'ember-computed';
import get from 'ember-metal/get';
import { isNone } from 'ember-utils';
import { htmlSafe } from 'ember-string';

export default Component.extend({
  layout,
  tagName: '',

  imageTop: computed('header', function() {
    return ['intro-page', 'end-page'].indexOf(get(this, 'header.quesType')) > -1
  }),
  imageNormal: not('imageTop').readOnly(),

  hasImages: notEmpty('header.images').readOnly(),
  hasTopImages: and('hasImages', 'imageTop').readOnly(),
  hasNormalImages: and('hasImages', 'imageNormal').readOnly(),

  requiredMark: computed('header.isMust', {
    get() {
      return get(this, 'header.isMust')
        ? htmlSafe(`<span class="required-asterisk">*</span>`) : null;
    }
  }).readOnly(),

  description: computed('header.description', {
    get() {
      const description = get(this, 'header.description');
      return description ? htmlSafe(`<pre class="description">${description}</pre>`) : null;
    }
  }).readOnly()
}).reopenClass({positionalParams: ['header']});

/**
 * UiHeaderComponent
 *
 ``` javascript
 {{ui-component/ui-header intro imageTop=true}}
 ```
 *
 * @class UiHeaderComponent
 */

/**
 * header
 *
 * @property {Object} header
 * @property {Array} header.images - header的图片
 * @example
 ```javascript
 image:{
      ratio: image.ratio,
      thumbnail: image.thumbnail,
      image: image.natural,
 }
 ```
 * @property {Bool} header.isMust - 是否必选
 * @property {Number} header.number - 当前是第几题
 * @property {String} header.title - 问卷标题
 * @property {String} header.description - 问卷描述
 */
