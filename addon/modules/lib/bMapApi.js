
let mapInstance = function(){
  const map = new window.BMap.Map();
  mapInstance = () => {
    return map;
  };
  return map;
};

let geoInstance = function(){
  const geoLocation = new window.BMap.Geolocation();
  geoInstance = () => {
    return geoLocation;
  };
  return geoLocation;
};

/**
 * 调用百度地图接口获得当前位置
 * 返回能解析当前位置的Promise
 * @returns {Promise}
 */
export const getLocation = () => {
  return new Promise((resolve, reject) => {
    const geoLocation = geoInstance();
    geoLocation.getCurrentPosition((position) => {
      if (geoLocation.getStatus() == window.BMAP_STATUS_SUCCESS) {
        resolve(position);
      } else {
        reject(new Error('locating failed'));
      }
    });
  });
};

/**
 * 连接地址
 * @param {object} address 百度api得到的address对象
 * @param {string} [splitChar] 分隔符
 * @param {boolean} [verbose] 是否详细
 * @returns {string}
 */
export const joinAddress = (address, splitChar = '-', verbose) => {
  let resultText = address.province;
  address.city && (resultText += splitChar + address.city);
  address.district && (resultText += splitChar + address.district);
  if (verbose) {
    address.street && (resultText += splitChar + address.street);
    address.street_number && (resultText += address.street_number);
  }
  return resultText;
};

/**
 * 获得两点间的距离
 * @param {object} siteOne
 *        {
 *          {number} longitude: 经度
 *          {number} latitude: 纬度
 *        }
 * @param {object} siteTwo
 * @return {number}
 */
export const getDistance = (siteOne, siteTwo) => {
  const map = mapInstance();
  const distance =  map.getDistance(new window.BMap.Point(siteOne.longitude, siteOne.latitude),
    new window.BMap.Point(siteTwo.longitude, siteTwo.latitude));
  return distance;
};

