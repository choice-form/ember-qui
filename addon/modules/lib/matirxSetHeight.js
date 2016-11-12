

function matrixSetHeight() {
  /**
   * 设置fixheader的高度
   * @type {any}
   */
  const fixHeaderColumns = this.element.getElementsByClassName('fix-header-column');
  let maxHeightForHeader = 0;
  for (let i = 0; i < fixHeaderColumns.length; i++) {
    if (fixHeaderColumns[i].offsetHeight > maxHeightForHeader) {
      maxHeightForHeader = fixHeaderColumns[i].offsetHeight;
    }
  };
  $(fixHeaderColumns).css('height', maxHeightForHeader + 'px');



  /**
   * 设置colmun的高度
   * @type {any}
   */

  const fixColumns = this.element.getElementsByClassName('fix-column')[0].getElementsByTagName('li');
  let colHeights = [];

  for (let j = 0; j < fixColumns.length; j++) {
    colHeights[j] = fixColumns[j].offsetHeight;
  };

  const columns = this.element.getElementsByClassName('column');
  for (let k = 0; k < columns.length; k++) {
    const columnItems = columns[k].getElementsByClassName('column-item');
    for (var l = 0; l < colHeights.length; l++) {
      columnItems[l].style.height = colHeights[l] + 'px';
    }
  };
}

export default matrixSetHeight;
