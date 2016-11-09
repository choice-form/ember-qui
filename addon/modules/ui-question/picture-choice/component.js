import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed,{alias} from 'ember-computed';
import Masonry from 'masonry';
import imagesLoaded from 'imagesloaded';

export default Component.extend({
  layout,

  classNames:['picture-lists'],
  classNameBindings: ['priority'],
  priority: computed('node.textDirection', 'node.pictureSize', function () {

    const textDirection = get(this, "node.textDirection");
    const pictureSize = get(this, "node.pictureSize");
    return `${textDirection} ${pictureSize}`
  }),


  isLoading: alias("_thisLoading"),

  _thisLoading : true,

  actions: {
    /**
     * click事件
     */
    handleOptionClick(option){
      this.handleEvents.handleOptionClick(option, get(this, 'node'));
    },
  },

  didRender(){
    const showStyle = get(this, 'node.showStyle');

    if(showStyle == 'pinterest'){
      imagesLoaded(this.element, () => {
        set(this, '_thisLoading', false);
        this.newMasonry = new Masonry(this.element);
      });
    }
  },


  willDestroy(){
    if(get(this, 'node.showStyle') == 'pinterest'){
      this.newMasonry.remove(this.element);
    }
  }


}).reopenClass({positionalParams: ['node', 'handleEvents']});
