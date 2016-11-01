import Component from 'ember-component';
import layout from './template';
import computed, { alias } from 'ember-computed';
import get from 'ember-metal/get';

export default Component.extend({
  layout,
  tagName:'',
  size: '16px',
  viewBox: '16',

});
