import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import computed from 'ember-computed';
import Masonry from 'masonry';
import imagesLoaded from 'imagesloaded';


export default Component.extend({
  layout,
  classNames:['picture-layout'],
  classNameBindings: ['class_names'],
  class_names: computed('node.showStyle', 'node.picStyle', 'node.textDirection', 'node.pictureSize', function () {
    const showStyle = get(this, 'node.showStyle');
    const picStyle = get(this, 'node.picStyle');
    const textDirection = get(this, "node.textDirection");
    const pictureSize = get(this, "node.pictureSize");
    const _className = `${showStyle ? showStyle : null}`+` ${picStyle ? picStyle : null}`+` ${textDirection ? textDirection : null}`+` ${pictureSize ? pictureSize : null}`;
    return _className;
  }),


  actions: {
    /**
     * click事件
     */
    handleOptionClick(option,e){
      !this.handleEvents.handleOptionClick(option, get(this, 'node'))
      && e.preventDefault();
    },
  },

  didRender(){
    const showStyle = get(this, 'node.showStyle');

    if(showStyle == 'pinterest'){
      imagesLoaded(this.element, () => {
        this.newMasonry = new Masonry(this.element);
      });
    }
  },


  willDestroy(){
    this.newMasonry && this.newMasonry.remove(this.element);
  }


}).reopenClass({positionalParams: ['node', 'handleEvents']});
