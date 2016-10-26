import Component from 'ember-component';
import layout from './template';
import styles from '../ui-control/control/styles';

export default Component.extend({
  layout, styles,
  tagName:'',


}).reopenClass({ positionalParams: ['question'] });
