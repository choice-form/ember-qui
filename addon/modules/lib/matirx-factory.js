import Swiper from 'swiper';
import device from 'device';
import $ from 'jquery';

function matrixSetHeight() {
  /**
   * 设置fixheader的高度
   * @type {any}
   */
  const fixHeaderColumns = this.element.getElementsByClassName('fix-header-column');
  $(fixHeaderColumns).css('height', 'auto');
  const matrixThumbnail = this.element.getElementsByClassName('matrix-thumbnail')[0];
  const matrixThumbnailHeight =  matrixThumbnail.offsetHeight;
  let maxHeightForHeader = 0;
  for (let i = 0; i < fixHeaderColumns.length; i++) {
    if (fixHeaderColumns[i].offsetHeight > maxHeightForHeader) {
      maxHeightForHeader = fixHeaderColumns[i].offsetHeight;
    }
  }
  const maxHeaderHeight = matrixThumbnailHeight > maxHeightForHeader ? matrixThumbnailHeight : maxHeightForHeader;
  matrixThumbnail.style.height = maxHeaderHeight + 'px';
  $(fixHeaderColumns).css('height', maxHeaderHeight + 'px');


  /**
   * 设置colmun的高度
   * @type {any}
   */

  const fixColumns = this.element.getElementsByClassName('fix-column')[0].getElementsByTagName('li');
  let colHeights = [];

  for (let j = 0; j < fixColumns.length; j++) {
    colHeights[j] = fixColumns[j].offsetHeight;
  }

  const columns = this.element.getElementsByClassName('column');
  for (let k = 0; k < columns.length; k++) {
    const columnItems = columns[k].getElementsByClassName('column-item');
    for (var l = 0; l < colHeights.length; l++) {
      columnItems[l].style.height = colHeights[l] + 'px';
    }
  }
}

export function swiperHeaderInit(element, config) {
  return new Swiper(element, {
    ...config
  });
}

export function swiperMatrixInit(element, matrixThumbnails, config, callBack) {
  const isDesktop = device.desktop();
  let touchIndex = 1;
  let startTime = 0;
  let endTime = 600;
  return new Swiper(element, {
    touchMoveStopPropagation:true,
    nextButton: '.matrix-button-next',
    prevButton: '.matrix-button-prev',
    pagination: '.swiper-pagination',
    ...config,
    runCallbacksOnInit: true,
    onInit: (swiper)=> {
      matrixThumbnails.removeAttr('class');
      matrixThumbnails.slice(swiper.realIndex, swiper.realIndex + config.slidesPerView).addClass('active');
      callBack && callBack();
    },

    onTouchStart(swiper){
      this.startX = swiper.touches.startX;
    },

    onTouchEnd(swiper){
      if(isDesktop) return null;

      //计算时间差， 如果时间差在300毫秒之内不出发动画
      touchIndex ++;
      if(touchIndex % 2 == 0){
        startTime = (new Date()).getTime();
      }else {
        endTime = (new Date()).getTime();
      }
      const time = endTime - startTime;
      if(Math.abs(time) < 300) return ;
      const realIndex = swiper.realIndex;
      this.endX = swiper.touches.startX;
      const diff = this.endX - this.startX;

      let offset = 0;
      if(diff > 20){
        offset = -1;
      }else if(diff < -20){
        offset = 1;
      }else{
        offset = 0;
      }
      swiper.slideTo(realIndex + offset);
      matrixThumbnails.removeAttr('class');
      matrixThumbnails.slice(swiper.realIndex, swiper.realIndex + config.slidesPerView).addClass('active');
    },

    onSlideChangeEnd: (swiper)=> {
      if(!isDesktop) return null;
      matrixThumbnails.removeAttr('class');
      matrixThumbnails.slice(swiper.realIndex, swiper.realIndex + config.slidesPerView).addClass('active');
    },

  });
}

export default matrixSetHeight;
