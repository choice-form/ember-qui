import { helper } from '@ember/component/helper';
import { insertImg } from '../lib/attribute-manage';

const insetimg =([str])=>{
  return insertImg(str);
};

export default helper(insetimg);
