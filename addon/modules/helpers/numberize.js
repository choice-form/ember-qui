import { helper } from '@ember/component/helper';

export const numberize = ([value]) => {
  return window.parseInt(value, 10)
}

export default helper(numberize)
