export default  function colorAlpha(color = 'rgba(0,0,0,0)', alpha = 1) {
  const colorArray = color.split(',');
  const lashIndex = colorArray.length - 1;
  colorArray[lashIndex] = alpha + ')';
  return colorArray.toString();
};


