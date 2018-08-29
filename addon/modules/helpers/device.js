import { helper } from '@ember/component/helper';
import { device } from 'device';

export const _device = ([name]) => {
  return device[name]();
};

export default helper(_device);
