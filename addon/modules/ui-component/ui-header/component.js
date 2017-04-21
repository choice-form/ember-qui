import Component from 'ember-component';
import layout from './template';
import computed, { notEmpty, and, not } from 'ember-computed';
import get from 'ember-metal/get';
import { htmlSafe } from 'ember-string';
import {insertImg} from '../../lib/attribute-manage';

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

  multiImages: computed('header.images', function () {
    return get(this ,'header.images').length > 1;
  }),

  requiredMark: computed('header.asterisks', {
    get() {
      return get(this, 'header.asterisks')
        ? htmlSafe(`<span class="required-asterisk">*</span>`) : null;
    }
  }).readOnly(),

  quesNumber: computed('header.number', {
    get() {
      return get(this, 'header.number')
        ? htmlSafe(`<span class="question-number">${get(this, 'header.number')}.</span>`) : null;
    }
  }).readOnly(),

  description: computed('header.description', {
    get() {
      const description = get(this, 'header.description');
      return description ? htmlSafe(`<pre class="description">${insertImg(description)}</pre>`) : null;
    }
  }).readOnly(),

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
 * @property {Bool} header.asterisks - 是否必选
 * @property {Number} header.number - 当前是第几题
 * @property {String} header.title - 问卷标题
 * @property {String} header.description - 问卷描述
 */
