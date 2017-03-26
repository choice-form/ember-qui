import Helper from 'ember-helper';
import {insertImg} from '../lib/attribute-manage';
import { htmlSafe } from 'ember-string'

const insetimg =([str])=>{
  return insertImg(str);
};

export default Helper.helper(insetimg);
