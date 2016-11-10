import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';

export default Component.extend({
  layout,
  tagName: '',

  actions:{
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
  }

}).reopenClass({positionalParams: ['node', 'option', 'handleEvents']});
