import Component from 'ember-component';
import computed from 'ember-computed';
import layout from './template';
import get from 'ember-metal/get';

export default Component.extend({
  layout,
  classNames:['ui-file-upload'],
  classNameBindings: ['priority'],
  priority: computed('node.quesType', function () {
    const quesType = `${get(this, "node.quesType")} primary border fade50`;
    return quesType;
  }),

  this_icon: computed('option.value', 'option.icon', function () {
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

  actions: {
    /**
     * onclick事件
     */
    handleOptionClick(e){
      //如果不能上传图片,就阻止input的默认事件
      !this.handleEvents.handleOptionClick(get(this, 'option'), get(this, 'node'))
        &&  e.preventDefault();
    },

    /**
     *
     */
    /*eslint-disable no-console */
    handleOptionInput(e){
      const data = e.currentTarget.files;
      this.handleEvents.handleOptionInput(data, get(this, 'option'), get(this, 'node')).then((res)=>{
        console.log(res);
      });
    },
  },

}).reopenClass({positionalParams: ['node', 'option', 'handleEvents']});
