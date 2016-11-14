import Swiper from 'swiper';
import $ from 'jquery';


function matrixSetHeight() {
  /**
   * 设置fixheader的高度
   * @type {any}
   */
  const fixHeaderColumns = this.element.getElementsByClassName('fix-header-column');
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

export function swiperMatrixInit(element, matrixThumbnails, config) {
  return new Swiper(element, {
    paginationClickable: true,
    nextButton: '.matrix-button-next',
    prevButton: '.matrix-button-prev',
    pagination: '.swiper-pagination',
    ...config,
    onInit: (e)=> {
      matrixThumbnails.removeAttr('class');
      matrixThumbnails.slice(e.realIndex, e.realIndex + config.slidesPerView).addClass('active');
    },
    onSlideChangeEnd: (e)=> {
      matrixThumbnails.removeAttr('class');
      matrixThumbnails.slice(e.realIndex, e.realIndex + config.slidesPerView).addClass('active');
      console.log(e.realIndex, config.slidesPerView);
    },
  });
}

export default matrixSetHeight;
