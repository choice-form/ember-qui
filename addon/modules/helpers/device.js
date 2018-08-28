import { helper } from '@ember/component/helper';

export const device = ([name]) => {
  return window.device[name]();
};

export default helper(device);
