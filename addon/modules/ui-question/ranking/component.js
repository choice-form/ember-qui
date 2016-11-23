import Component from 'ember-component';
import layout from './template';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed, {reads} from 'ember-computed';
import Sortable from 'sortable';
import {scheduleOnce, later} from 'ember-runloop';
import {addClass, removeClass} from '../../lib/attribute-manage'
import $ from 'jquery';
import device from 'device';

export default Component.extend({
  layout,

  classNames:['ui-ranking'],
  attributeBindings:['data-render-id'],
  'data-render-id': reads('node.renderId'),

  isScrollUp: true,
  isScrollDown: true,

  isDesktop: computed(function () {
    return device.desktop();
  }),

  actions: {
    handleOptionClick(){
      this.handleEvents.handleOptionClick(get(this, 'option'),get(this,'node'));
    },

    handleOptionInput(e){
      const value = e.target.value;
      set(this, 'option.value', value);
      this.handleEvents.handleOptionInput(get(this, 'option'),get(this,'node'));
    },
  },

  renderSortable() {
    //初始化
    const options = get(this, 'options');
    options.forEach((item,index)=>{
      if(item.sortNo > 0){
        addClass(this.element.getElementsByClassName('ranking-rank ')[index], 'complete')
      }
    });

    //sortable事件
    this.sortTable = new Sortable(this.element, {
      handle: '.handle',
      scroll: false,
      scrollSensitivity: get(this, 'isDesktop') ? 64 : 0,
      animation: 250,
      sort: true,
      ghostClass: "ghost",
      onEnd: (event)=> {
        const {oldIndex} = event;
        let {newIndex} = event;
        if (newIndex === undefined) {
          newIndex = oldIndex;
        }
        const indexArray = this.handleEvents.handleOptionDrop(oldIndex, newIndex, get(this,'node'));

        indexArray.forEach((item)=>{
          const sortNo = parseInt(item);
          const index = item -1;
          const thisNode = this.element.getElementsByClassName('ranking-rank ')[index];
          thisNode.querySelector('.ranking-number').innerHTML=sortNo;
          removeClass(thisNode, 'complete');
          addClass(thisNode, 'complete event');
          later(()=>{
            removeClass(thisNode, 'event');
          },1000);
        });
      }
    });
  },

  scrollMovie(event){

    if(event.target.className !== 'handle') return ;
    const offset = 64;
    const clientY = event.targetTouches[0].clientY;
    const winowHeight = $(window).height();
    const offsetX = offset;
    const offsetY = winowHeight - offset;

    const scrollAnimate = (num)=>{
      const scrollTop = $('body').scrollTop;
      const scrollTime = scrollTop * 2 / winowHeight > 0.3 ? 4000 : 2000;
      $('body').animate({scrollTop: num}, scrollTime);
    };

    if((clientY < offsetX) && this.isScrollUp){
      scrollAnimate(0);
      this.isScrollUp = false;
    }

    if((clientY > offsetY) && this.isScrollDown){
      scrollAnimate(winowHeight);
      this.isScrollDown = false;
    }

    if((clientY <= offsetY) && (clientY >= offsetX) && (!this.isScrollUp || !this.isScrollDown)){
      $('body').stop();
      this.isScrollUp = true;
      this.isScrollDown = true;
    }
  },

  scrollStop(){
    $('body').stop();
  },


  didInsertElement(){
    scheduleOnce('afterRender', this, 'renderSortable');
    if(get(this, 'isDesktop')) return ;
    this.element.addEventListener('touchmove',this.scrollMovie,false);
    this.element.addEventListener('touchend',this.scrollStop,false);
  },

  didDestroyElement(){
    this.sortTable.destroy();
    if(get(this, 'isDesktop')) return ;
    this.element.removeEventListener('touchmove',this.scrollMovie,false);
    this.element.removeEventListener('touchend',this.scrollStop,false);

  }
}).reopenClass({ positionalParams: ['node', 'handleEvents']});
