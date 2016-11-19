import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import computed from 'ember-computed';
import set from 'ember-metal/set';

export default Component.extend({
  layout,
  tagName: '',

  icon: computed('option.value', 'option.icon', function () {
    return get(this, 'option.value') ? 'refresh' : get(this, 'option.icon');
  }),

  state: computed('option.value', function () {
    return get(this, 'option.value') ? ' success' : null;
  }),

  button: computed('option.value', function () {
    return get(this, 'option.value') ? ' secondary' : ' contrast';
  }),

  uploadText: computed('option.value', function () {
    return get(this, 'option.value') ? 'refresh upload' : 'Upload Picture';
  }),

  progress: 0,

  actions:{
    /**
     * 点击删除按钮
     */
    handleOptionRemove(){
      this.handleEvents.handleOptionInput('', get(this, 'option'), get(this, 'node'));
    },

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
      set(this,'progress','99');
      this.handleEvents.handleOptionInput(data, get(this, 'option'), get(this, 'node')).then(()=>{
        set(this,'progress','100');
      });
    },
  }

}).reopenClass({positionalParams: ['node', 'option', 'handleEvents']});
