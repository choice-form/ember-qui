import Swiper from 'swiper';
import { later } from '@ember/runloop';
import $ from 'jquery';

function matrixSetHeight() {
  /**
   * 设置fixheader的高度
   * @type {any}
   */
  const fixHeaderColumnSpans = this.element.querySelectorAll(
    '.fix-header-column span'
  );
  const fixHeaderColumns = this.element.querySelectorAll('.fix-header-column');
  const matrixThumbnail = this.element.querySelector('.matrix-thumbnail');
  matrixThumbnail.style.height = 'auto';
  const matrixThumbnailHeight = matrixThumbnail.offsetHeight;
  let maxHeightForHeader = 0;
  for (let i = 0; i < fixHeaderColumnSpans.length; i++) {
    if (fixHeaderColumnSpans[i].offsetHeight > maxHeightForHeader) {
      maxHeightForHeader = fixHeaderColumnSpans[i].offsetHeight;
    }
  }
  const maxHeaderHeight =
    matrixThumbnailHeight > maxHeightForHeader
      ? matrixThumbnailHeight
      : maxHeightForHeader;
  matrixThumbnail.style.height = maxHeaderHeight + 'px';
  $(fixHeaderColumns).css('height', maxHeaderHeight + 'px');

  /**
   * 设置colmun的高度
   * @type {any}
   */

  const fixColumns = this.element
    .querySelector('.fix-column')
    .querySelectorAll('li');
  let colHeights = [];
  for (let j = 0; j < fixColumns.length; j++) {
    colHeights[j] = fixColumns[j].offsetHeight;
  }

  const columns = this.element.querySelectorAll('.column');
  for (let k = 0; k < columns.length; k++) {
    const columnItems = columns[k].querySelectorAll('.column-item');
    for (var l = 0; l < colHeights.length; l++) {
      columnItems[l].style.height = colHeights[l] + 'px';
    }
  }
}

export function swiperHeaderInit(element, isStretch, columnLength) {
  const slidesPerView = isStretch ? 4 : 2;
  return new Swiper(element, {
    slidesPerView: columnLength < 2 ? 1 : slidesPerView,
    breakpoints: {
      // when window width is <= 768px
      768: {
        slidesPerView: isStretch ? 2 : 1,
      },
    },
  });
}

export function swiperMatrixInit(
  isDesktop,
  element,
  matrixThumbnails,
  isStretch,
  callBack,
  columnLength
) {
  let touchIndex = 1;
  let startTime = 0;
  let endTime = 600;
  const slidesPerView = isStretch ? 4 : 2;
  const swiper = new Swiper(element, {
    navigation: {
      nextEl: '.matrix-button-next',
      prevEl: '.matrix-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
    },
    slidesPerView: columnLength < 2 ? 1 : slidesPerView,
    breakpoints: {
      // when window width is <= 768px
      768: {
        slidesPerView: isStretch ? 2 : 1,
      },
    },
    init: false,
  });

  swiper.on('init', function() {
    matrixThumbnails.removeAttr('class');
    matrixThumbnails
      .slice(swiper.realIndex, swiper.realIndex + swiper.params.slidesPerView)
      .addClass('active');
    callBack &&
      later(() => {
        callBack();
      }, 100);
  });

  swiper.init();

  swiper.on('touchStart', function() {
    if (isDesktop) return null;
    this.startX = swiper.touches.startX;
    this.startY = swiper.touches.startY;
  });

  swiper.on('touchEnd', function() {
    if (isDesktop) return null;

    //计算时间差， 如果时间差在300毫秒之内不出发动画
    touchIndex++;
    if (touchIndex % 2 == 0) {
      startTime = new Date().getTime();
    } else {
      endTime = new Date().getTime();
    }
    const time = endTime - startTime;
    if (Math.abs(time) < 300) return;
    const realIndex = swiper.realIndex;
    this.endX = swiper.touches.startX;
    this.endY = swiper.touches.startY;
    const diff = this.endX - this.startX;
    const diffY = Math.abs(this.endY - this.startY);
    let offset = 0;
    if (diff > 20) {
      offset = -1;
    } else if (diff < -20) {
      offset = 1;
    } else {
      offset = 0;
    }
    if (diffY > 0) {
      later(() => {
        swiper.slideTo(realIndex + offset);
      }, 10);
    }
  });

  swiper.on('slideChange', function() {
    matrixThumbnails.removeAttr('class');
    matrixThumbnails
      .slice(swiper.realIndex, swiper.realIndex + swiper.params.slidesPerView)
      .addClass('active');
  });

  return swiper;
}

export default matrixSetHeight;
