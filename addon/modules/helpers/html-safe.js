import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export const _htmlSafe = ([string]) => {
  return htmlSafe(string || '')
};

export default helper(_htmlSafe);
