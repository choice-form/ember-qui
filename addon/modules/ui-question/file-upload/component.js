import { computed, get, set } from '@ember/object';
import { reads } from '@ember/object/computed';
import Component from '@ember/component';
import { device } from 'device';

import { tempI18n } from '../../helpers/temp-i18n';
import layout from './template';

export default Component.extend({
  layout,
  classNames: ['ui-file-upload'],
  attributeBindings: ['data-render-id'],
  'data-render-id': reads('option.renderId'),

  accept: computed(function() {
    return device.mobile ? 'image/*' : null;
  }).readOnly(),

  icon: computed('option.{icon,value}', function() {
    return get(this, 'option.value') ? 'refresh' : get(this, 'option.icon');
  }),

  state: computed('option.value', function() {
    return get(this, 'option.value') ? ' success' : null;
  }),

  button: computed('option.value', function() {
    return get(this, 'option.value') ? ' secondary' : ' contrast';
  }),

  uploadText: computed('option.value', function() {
    return tempI18n(get(this, 'option.value') ? 'UI_ReUpload' : 'UI_Upload');
  }),

  progress: 0,

  actions: {
    handleOptionRemove() {
      this.handleEvents.handleOptionInput(
        '',
        get(this, 'option'),
        get(this, 'node')
      );
      this.element.getElementsByTagName('input')[0].value = '';
    },

    handleOptionClick(e) {
      //如果不能上传图片,就阻止input的默认事件
      const node = get(this, 'node');
      // 兼容新版上传
      if (node.newapi) {
        node.onProgress = e => {
          set(this, 'progress', e + '');
        };
      }
      const rs = this.handleEvents.handleOptionClick(
        get(this, 'option'),
        get(this, 'node')
      );
      if (!rs || node.newapi) {
        e.preventDefault();
      }
    },

    handleOptionInput(e) {
      const data = e.currentTarget.files;
      set(this, 'progress', '99');
      this.handleEvents
        .handleOptionInput(data, get(this, 'option'), get(this, 'node'))
        .then(() => set(this, 'progress', '100'));
    },
  },
}).reopenClass({ positionalParams: ['node', 'option', 'handleEvents'] });
