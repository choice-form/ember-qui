import rsvp from 'rsvp';

const cache = {
  geoLocation: null,
  map: null
};

/**
 * 调用百度地图接口获得当前位置
 *
 * @method getLocation
 * @return {Promise} 返回能解析当前位置的 Promise
 */
/* eslint-disable no-undef */
export const getLocation = () => {
  if (cache.geoLocation === null) {
    cache.geoLocation = new window.BMap.Geolocation();
  }

  return new rsvp.Promise((resolve, reject) => {
    cache.geoLocation.getCurrentPosition((position) => {
      if (cache.geoLocation.getStatus() == window.BMAP_STATUS_SUCCESS) {
        resolve(position);
      } else {
        reject(new Error('locating failed'));
      }
    });
  });
};

/**
 * 连接地址
 *
 * @method joinAddress
 * @param {object} address 百度api得到的address对象
 * @param {string} [splitChar] 分隔符
 * @param {boolean} [verbose] 是否详细
 * @return {string}
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
 *
 * @method getDistance
 * @param {object} siteOne
 *        {
 *          {number} longitude: 经度
 *          {number} latitude: 纬度
 *        }
 * @param {object} siteTwo
 * @return {number}
 */
export const getDistance = (siteOne, siteTwo) => {
  if (cache.map === null) {
    cache.map = new window.BMap.Map();
  }

  return cache.map.getDistance(
    new window.BMap.Point(siteOne.longitude, siteOne.latitude),
    new window.BMap.Point(siteTwo.longitude, siteTwo.latitude)
  );
};

