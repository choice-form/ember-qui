import Component from 'ember-component';
import computed from 'ember-computed';
import layout from './template';
import get from 'ember-metal/get';

export default Component.extend({
  layout,
  classNames:['ui-file-upload'],

  uploadIcon: computed('option.value', 'option.icon', function () {
    return get(this, 'option.value') ? 'refresh' : get(this, 'option.icon');
  }),

  uploadState: computed('option.value', function () {
    return get(this, 'option.value') ? ' success' : null;
  }),

  uploadButton: computed('option.value', function () {
    return get(this, 'option.value') ? ' secondary' : ' contrast';
  }),

  uploadText: computed('option.value', function () {
    return get(this, 'option.value') ? 'refresh upload' : 'Upload Picture';
  }),


}).reopenClass({positionalParams: ['node', 'option']});
